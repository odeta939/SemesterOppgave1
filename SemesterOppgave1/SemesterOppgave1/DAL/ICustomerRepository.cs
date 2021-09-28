using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SemesterOppgave1.Models;

namespace SemesterOppgave1.DAL
{
    public interface ICustomerRepository
    {

        Task<List<Customer>> GetAllCustomers();

    }
}
