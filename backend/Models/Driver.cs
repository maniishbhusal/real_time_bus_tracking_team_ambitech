using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Driver
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [StringLength(15)]
        public string LicenseNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(15)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public int BusId { get; set; } // Foreign key to Bus table

        [ForeignKey("BusId")]
        [JsonIgnore]
        public virtual Bus Bus { get; set; } = null!;
    }
}
