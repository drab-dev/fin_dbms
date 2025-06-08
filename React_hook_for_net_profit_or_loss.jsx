
export function useRealtimeNetProfit() {
  const [netProfit, setNetProfit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let subscription;

    const fetchInitialData = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_net_profit')
          .single();

        if (error) throw error;
        setNetProfit(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInitialData();

    // Subscribe to changes
    subscription = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions'
        },
        () => fetchInitialData() // Re-fetch when transactions change
      )
      .subscribe();

    return () => {
      if (subscription) supabase.removeChannel(subscription);
    };
  }, []);

  return { netProfit, loading, error };
}