﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Order
    {
        public int Id { get; set; }
        [RegularExpression(@"^([1 - 9]{1})(\d{1})$")]
        public int TicketAmount { get; set; }
        [RegularExpression(@"^([1 - 9]{1})(\d{1,6})$")]
        public int TotalPrice { get; set; }

        // route
        [RegularExpression(@"^(0[1-9]|[1-2][0-9]|3[0-1])[\.\-\/](0[1-9]|1[0-2])[\.\-\/](20)[0-9]{2}$")]
        public string DepartureTime { get; set; }
        [RegularExpression(@"^(0[1-9]|[1-2][0-9]|3[0-1])[\.\-\/](0[1-9]|1[0-2])[\.\-\/](20)[0-9]{2}$")]
        public string ArrivalTime { get; set; }
        [RegularExpression(@"^[a-zA-ZøæåØÆÅ. \-]{2,20}$")]
        public string  BoatName { get; set; }
        [RegularExpression(@"^[a-zA-ZøæåØÆÅ. \-]{2,20}$")]
        public string  DeparturePlace { get; set; }
        [RegularExpression(@"^[a-zA-ZøæåØÆÅ. \-]{2,20}$")]
        public string  ArrivalPlace { get; set; }

        //customer
        [RegularExpression(@"^[a-zA-ZøæåØÆÅ. \-]{2,20}$")]
        public string Firstname { get; set; }
        [RegularExpression(@"^[a-zA-ZøæåØÆÅ. \-]{2,30}$")]
        public string Lastname { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZøæåØÆÅ. \-]{2,50}$")]
        public string Street { get; set; }
        //[2-9] fordi telefonnummer som starter på 0 eller 1 er ugyldige i Norge.
        [RegularExpression(@"^(\+47)?[2-9]\[0-9]{7}$")]
        public string Phonenr { get; set; }
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)")]
        public string Email { get; set; }
        [RegularExpression(@"^([0-9]{4})|([1-9]{1}[0-9]{4})|([1-9]{3} [1-9]{2})$")]
        public string ZipCode { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZøæåØÆÅ. \-]{2,30}$")]
        public string City { get; set; }
    }
}
