using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class BusLocation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int BusId { get; set; } // Foreign key to Bus table

        [ForeignKey("BusId")]
        public virtual Bus Bus { get; set; } = null!;

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }

    public class UpdateLocationRequest
    {
        [Required]
        [StringLength(20)]
        public string RegistrationNumber { get; set; } = string.Empty;

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }
    }
}
