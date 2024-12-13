namespace backend.Models
{
    public class BusCheckpoint
    {
        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double DistanceFromPrevious { get; set; }
        //----
        public List<PathPoint> PathToNext { get; set; } = new List<PathPoint>();
    }
}
