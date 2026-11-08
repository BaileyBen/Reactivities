using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain; // 1. Ensure this namespace contains your correct entity (Activity or TheActivity)
using MediatR;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        // Change 'TheActivity' to 'Activity' if that matches your Domain entity name
        public class Query : IRequest<Result<TheActivity>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Query, Result<TheActivity>>
        {
            // 2. Fixed the return type signature to match the IRequest target
            public async Task<Result<TheActivity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Id], cancellationToken);

                // 3. These now evaluate perfectly because the method returns a Result<TheActivity>
                if (activity == null) return Result<TheActivity>.Failure("Activity not found", 404);
                
                return Result<TheActivity>.Success(activity);
            }
            
            // 4. DELETED the duplicate explicit interface implementation block that was throwing the error
        }
    }
}