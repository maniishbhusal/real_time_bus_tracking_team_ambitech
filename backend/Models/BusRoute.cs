namespace backend.Models
{
    public class BusRoute
    {
        public string RouteName { get; set; }
        public List<BusCheckpoint> BusCheckpoints { get; set; }
        public double TotalDistance { get; set; }
    }
}
