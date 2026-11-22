using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ActivityAttendee
    {
        public string? UserId { get; set; }  
        public User User { get; set; } = null!;
        public string? ActivityId { get; set; }  
        public TheActivity Activity { get; set; } = null!;
        public bool IsHost { get; set; }    
        public DateTime DateJoined { get; set; } = DateTime.UtcNow;

    }
}