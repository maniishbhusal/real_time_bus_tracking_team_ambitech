using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Index(nameof(RegistrationNumber), IsUnique = true)]
    public class Bus
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string RegistrationNumber { get; set; } = string.Empty; // Like "BA 1 KHA 2345"

        [Required]
        [StringLength(100)]
        public string RouteName { get; set; } = string.Empty; // e.g., "Kathmandu-Pokhara"

        [JsonIgnore]
        public virtual ICollection<BusLocation> Locations { get; set; } = new List<BusLocation>();
    }
}
