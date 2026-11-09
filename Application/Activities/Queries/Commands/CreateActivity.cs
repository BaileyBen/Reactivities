using System;
using System.Collections.Generic;
using System.Configuration.Assemblies;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Queries.Commands
{
    public class CreateActivity
    {
        public class Command : IRequest<Result<string>>
        {
            public required CreateActivityDto ActivityDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IValidator<Command> validator) : IRequestHandler<Command, Result<string>> {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = mapper.Map<TheActivity>(request.ActivityDto);

                context.Activities.Add(activity);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;
                
                if (!result) return Result<string>.Failure("Failed to create the activity", 404);
                return Result<string>.Success(activity.Id);

            }
        }
    }
}