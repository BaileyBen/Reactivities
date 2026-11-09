using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<TheActivity, TheActivity>();
            CreateMap<CreateActivityDto, TheActivity>();
            CreateMap<EditActivityDto, TheActivity>();
        }
    }
}