using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Hubs;
using backend.Data;
using Microsoft.AspNetCore.SignalR;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHubContext<BusLocationHub> _hubContext;

        public LocationController(ApplicationDbContext context, IHubContext<BusLocationHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }


        // New endpoint to register a bus
        [HttpPost("register")]
        public async Task<IActionResult> RegisterBus([FromBody] Bus bus)
        {
            try
            {
                _context.Buses.Add(bus);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    id = bus.Id,
                    registrationNumber = bus.RegistrationNumber,
                    routeName = bus.RouteName
                });
            }
            catch (DbUpdateException)
            {
                return BadRequest("Registration number already exists");
            }
        }

        // GET: api/Location/all
        [HttpGet("all")]
        public async Task<IActionResult> GetAllBusLocations()
        {
            try
            {
                // Get all buses with their latest location
                var buses = await _context.Buses
                    .Include(b => b.Locations
                        .OrderByDescending(l => l.Timestamp)
                        .Take(1))
                    .ToListAsync();

                var response = buses
                    .Where(b => b.Locations.Any()) // Only include buses with locations
                    .Select(bus => new
                    {
                        registrationNumber = bus.RegistrationNumber,
                        routeName = bus.RouteName,
                        latitude = bus.Locations.First().Latitude,
                        longitude = bus.Locations.First().Longitude,
                        timestamp = bus.Locations.First().Timestamp
                    })
                    .ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/Location/update
        [HttpPost("update")]
        public async Task<IActionResult> UpdateBusLocation([FromBody] UpdateLocationRequest request)
        {
            try
            {
                // Find the bus by registration number
                var bus = await _context.Buses
                    .FirstOrDefaultAsync(b => b.RegistrationNumber == request.RegistrationNumber);

                if (bus == null)
                {
                    return NotFound($"Bus with registration number {request.RegistrationNumber} not found");
                }

                // Create new location entry
                var location = new BusLocation
                {
                    BusId = bus.Id,
                    Latitude = request.Latitude,
                    Longitude = request.Longitude,
                    Timestamp = DateTime.UtcNow
                };

                // Add location to database
                _context.BusLocations.Add(location);
                await _context.SaveChangesAsync();

                // Prepare real-time update data
                var updateData = new
                {
                    busRegistrationNumber = bus.RegistrationNumber,
                    routeName = bus.RouteName,
                    latitude = location.Latitude,
                    longitude = location.Longitude,
                    timestamp = location.Timestamp
                };

                // Send real-time update
                await _hubContext.Clients.All.SendAsync("ReceiveBusLocation", updateData);

                return Ok(updateData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{registrationNumber}")]
        public async Task<IActionResult> GetBusLocation(string registrationNumber)
        {
            var location = await _context.BusLocations
                .Include(l => l.Bus)
                .Where(l => l.Bus.RegistrationNumber == registrationNumber)
                .OrderByDescending(l => l.Timestamp)
                .FirstOrDefaultAsync();

            if (location == null)
            {
                return NotFound($"No location found for bus: {registrationNumber}");
            }

            return Ok(new
            {
                registrationNumber = location.Bus.RegistrationNumber,
                routeName = location.Bus.RouteName,
                latitude = location.Latitude,
                longitude = location.Longitude,
                timestamp = location.Timestamp
            });
        }
    }
}