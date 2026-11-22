using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain; // 1. Ensure this namespace contains your correct entity (Activity or TheActivity)
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        // Change 'TheActivity' to 'Activity' if that matches your Domain entity name
        public class Query : IRequest<Result<ActivityDto>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<ActivityDto>>
        {
            // 2. Fixed the return type signature to match the IRequest target
            public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);

                // 3. These now evaluate perfectly because the method returns a Result<TheActivity>
                if (activity == null) return Result<ActivityDto>.Failure("Activity not found", 404);
                
                return Result<ActivityDto>.Success(activity);
            }
            
            // 4. DELETED the duplicate explicit interface implementation block that was throwing the error
        }
    }
}