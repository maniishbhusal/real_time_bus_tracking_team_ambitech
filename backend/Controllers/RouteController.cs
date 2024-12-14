using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouteController : ControllerBase
    {
        private readonly BusRoute _routeData;

        public RouteController()
        {
            // Initialize with your static data
            _routeData = new BusRoute
            {
                RouteName = "Lagankhel to Gongabu Buspark",
                BusCheckpoints = new List<BusCheckpoint>
            {
                new BusCheckpoint { Name = "Lagankhel", Latitude =27.666494882229525, Longitude = 85.32358121220484, DistanceFromPrevious = 0,  PathToNext = new List<PathPoint>
    {
        new PathPoint { Latitude = 27.666758652253513, Longitude = 85.32344150123437 },
        new PathPoint { Latitude = 27.66705025590112, Longitude = 85.32252813100953 },
        new PathPoint { Latitude = 27.668205375554003, Longitude = 85.32166113455261 },
        new PathPoint { Latitude = 27.669388078651995, Longitude = 85.3219620849291 },
        new PathPoint { Latitude = 27.66969297906031, Longitude = 85.32187862815162},
        new PathPoint { Latitude = 27.670323931323804, Longitude = 85.32099254618147},
        // new PathPoint { Latitude = 27.670323931323804, Longitude = 85.32099254618147},
        // new PathPoint { Latitude = 27.66983460199487, Longitude = 85.32064863362004},
        // Add more points to define the exact path to the next checkpoint
    } },
                new BusCheckpoint { Name = "Kumaripati", Latitude = 27.670326474005723, Longitude = 85.32100099876797, DistanceFromPrevious = 0.65,  PathToNext = new List<PathPoint>
    {
        new PathPoint { Latitude = 27.67182727633599, Longitude = 85.31765358409797},
        new PathPoint { Latitude = 27.67249217909176, Longitude = 85.31427008205807},
        new PathPoint { Latitude = 27.67266505314291, Longitude = 85.31351429984211},
        new PathPoint { Latitude = 27.672877820830337, Longitude = 85.31338416515592},
        new PathPoint { Latitude = 27.67353828457059, Longitude = 85.3119977301268},
        new PathPoint { Latitude = 27.674052468345455, Longitude = 85.31194767822383},
                    // Add more points to define the exact path to the next checkpoint
                }, },
                new BusCheckpoint { Name = "Jawalakhel", Latitude = 27.67416643738636, Longitude = 85.31226843129122, DistanceFromPrevious = 1.2 },
                // new BusCheckpoint { Name = "Pulchowk", Latitude = 27.678846431000323, Longitude = 85.31691764053814, DistanceFromPrevious = 2.6 },
                // new BusCheckpoint { Name = "Hariharbhawan", Latitude = 27.68128915866794, Longitude = 85.31562918104868, DistanceFromPrevious = 0.65 },
                // new BusCheckpoint { Name = "Kupondole", Latitude = 27.686491217517347, Longitude = 85.31498846474844, DistanceFromPrevious = 1.8 },
                // new BusCheckpoint { Name = "Tripureshwor", Latitude = 27.695300534325906, Longitude = 85.3150397187193, DistanceFromPrevious = 1.6 },
                // new BusCheckpoint { Name = "NAC", Latitude = 27.702831078108016, Longitude = 85.31301024253945, DistanceFromPrevious = 1.5 },
                // new BusCheckpoint { Name = "Jamal", Latitude = 27.709614390837938, Longitude = 85.31514767902324, DistanceFromPrevious = 1.0 },
                // new BusCheckpoint { Name = "Lainchaur", Latitude = 27.721717337099815, Longitude = 85.31493303353051, DistanceFromPrevious = 2.0 },
                // new BusCheckpoint { Name = "Lazimpat", Latitude = 27.718794434723808, Longitude = 85.31545012471834, DistanceFromPrevious = 1.3 },
                // new BusCheckpoint { Name = "Panipokhari", Latitude = 27.73705626107198, Longitude = 85.32803794301759, DistanceFromPrevious = 2.2 },
                // new BusCheckpoint { Name = "Rastrapati Bhawan", Latitude = 27.67196146464912, Longitude = 85.2999387636966, DistanceFromPrevious = 11.2 },
                // new BusCheckpoint { Name = "Teaching Hospital", Latitude = 27.739722311179314, Longitude = 85.33041197852188, DistanceFromPrevious = 10.3 },
                // new BusCheckpoint { Name = "Narayan Gopal Chowk", Latitude = 27.74054058656301, Longitude = 85.33749320401624, DistanceFromPrevious = 1.2 },
                // new BusCheckpoint { Name = "Basundhara", Latitude = 27.718224210040223, Longitude = 85.32404978434352, DistanceFromPrevious = 3.5 },
                // new BusCheckpoint { Name = "Samakhusi", Latitude = 27.727550768360114, Longitude = 85.31737480869054, DistanceFromPrevious = 2.3 },
                // new BusCheckpoint { Name = "Gongabu", Latitude = 27.73641210794491, Longitude = 85.31252347140524, DistanceFromPrevious = 1.5 }
            },
                TotalDistance = 38.4
            };
        }

        [HttpGet]
        public ActionResult<BusRoute> GetRoute()
        {
            return Ok(_routeData);
        }

        //  its an endpoint to track the bus location.
        private static BusLocation _currentBusLocation = new BusLocation
        {
            Latitude = 27.666494882229525,
            Longitude = 85.32358121220484
        };

        [HttpGet("busLocation")]
        public ActionResult<BusLocation> GetBusLocation()
        {
            return Ok(_currentBusLocation);
        }

        [HttpPost("busLocation")]
        public ActionResult UpdateBusLocation([FromBody] BusLocation location)
        {
            _currentBusLocation = location;
            return Ok();
        }
    }
}
