using Microsoft.AspNet.Identity;
using DomainLayer.Model.ContractorTrainingNs;
using DomainLayer.ViewModel;
using DomainLayer.ViewModel.ContractorTraining;
using Microsoft.AspNetCore.Mvc;
using ServicesLayer.IService.ContractorTraining;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthApi.model;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace AuthApi.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]

    public class ContractorTrainingController : ControllerBase
    {
        #region Property  
        private readonly IContractorTrainingService iContractorTrainingService;
        private IWebHostEnvironment _env;
        #endregion

        #region Constructor  
        public ContractorTrainingController(IContractorTrainingService ContractorTrainingService,
             IWebHostEnvironment env)
        {
            iContractorTrainingService = ContractorTrainingService;
            _env = env;
        }
        #endregion

        [HttpGet(nameof(GetContractorTraining))]
        public IActionResult GetContractorTraining(int id)
        {
            var result = iContractorTrainingService.GetContractorTraining(id);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

        [HttpGet(nameof(GetSubmittedApplicationDetail))]
        public IActionResult GetSubmittedApplicationDetail(string id)
        {
            var result = iContractorTrainingService.GetSubmittedApplicationDetail(id);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

        [HttpPost(nameof(InsertContractorTraining))]
        public IActionResult InsertContractorTraining(ContractorTrainingViewModal contractorTraining)
        {
            int Id = iContractorTrainingService.InsertContractorTraining(contractorTraining);

            //Passport Photo Upload
            string fp = "/Resources/Photos/PassportPhoto/" + Id;
            if (!string.IsNullOrEmpty(contractorTraining.PassportPhotobase64))
            {
                string path1 = $"{fp}";
                var mappedpath = _env.ContentRootPath + path1;
                byte[] b = Convert.FromBase64String(contractorTraining.PassportPhotobase64);
                string path = mappedpath;
                //check if directory exist
                if (!System.IO.Directory.Exists(path))
                {
                    System.IO.Directory.CreateDirectory(path); //create directory if it doesn't exist
                }
                //set the image path
                string filepath = Path.Combine(path + "\\" + contractorTraining.PassportPhotoName);
                byte[] imagebytes = Convert.FromBase64String(contractorTraining.PassportPhotobase64);
                System.IO.File.WriteAllBytes(filepath, imagebytes);

            }

            //Supporting documents upload
            //string docfp = "/Resources/Documents/SupportingDocuments/" + Id;
            //foreach (var doc in contractorTraining.SupportingDocList)
            //{
            //    if (!string.IsNullOrEmpty(doc.Base64))
            //    {
            //        string path1 = $"{docfp}";
            //        var mappedpath = _env.ContentRootPath + path1;
            //        byte[] b = Convert.FromBase64String(doc.Base64);
            //        string path = mappedpath;
            //        //check if directory exist
            //        if (!System.IO.Directory.Exists(path))
            //        {
            //            System.IO.Directory.CreateDirectory(path); //create directory if it doesn't exist
            //        }
            //        //set the image path
            //        string filepath = Path.Combine(path + "\\" + doc.FileName);
            //        byte[] imagebytes = Convert.FromBase64String(doc.Base64);
            //        System.IO.File.WriteAllBytes(filepath, imagebytes);

            //    }
            //}
            return Ok(Id);
        }

        [HttpPost(nameof(UpdateContractorTraining))]
        public IActionResult UpdateContractorTraining(ContractorTrainingViewModal contractorTraining)
        {
            int Id = iContractorTrainingService.UpdateContractorTraining(contractorTraining);

            //Passport Photo Upload
            string fp = "/Resources/Photos/PassportPhoto/" + Id;
            if (!string.IsNullOrEmpty(contractorTraining.PassportPhotobase64))
            {
                string path1 = $"{fp}";
                var mappedpath = _env.ContentRootPath + path1;
                byte[] b = Convert.FromBase64String(contractorTraining.PassportPhotobase64);
                string path = mappedpath;
                //check if directory exist
                if (System.IO.Directory.Exists(path))
                {
                    if (Directory.Exists(path))
                    {
                        DirectoryInfo d = new DirectoryInfo(path);
                        FileInfo[] Files = d.GetFiles();
                        foreach (var item in Files)
                        {
                            item.Delete();
                        }
                          
                    }
                }

                if (!System.IO.Directory.Exists(path))
                {
                    System.IO.Directory.CreateDirectory(path); //create directory if it doesn't exist
                }
                //set the image path
                string filepath = Path.Combine(path + "\\" + contractorTraining.PassportPhotoName);
                byte[] imagebytes = Convert.FromBase64String(contractorTraining.PassportPhotobase64);
                System.IO.File.WriteAllBytes(filepath, imagebytes);
            }

            //

            return Ok(Id);
        }

        //[Authorize]
        [HttpGet(nameof(GetAllContractorTraining))]
        public IActionResult GetAllContractorTraining(int status)
        {
            var result = iContractorTrainingService.GetAllContractorTraining(status);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");
        }

        //[Authorize]
        [HttpGet(nameof(GetSingleContractorTraining))]
        public IActionResult GetSingleContractorTraining(int Id)
        {
            try
            {
                var result = iContractorTrainingService.GetSingleContractorTraining(Id, User.Identity.Name);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost(nameof(SaveRank))]
        public IActionResult SaveRank(AddRankViewModel addRankViewModel)
        {

            APIResponse response = iContractorTrainingService.SaveRank(addRankViewModel);
            return Ok(response);
        }

        [HttpGet(nameof(GetSortedContractorTraining))]
        public IActionResult GetSortedContractorTraining()
        {
            var response = iContractorTrainingService.GetSortedContractorTraining();
            return Ok(response);
        }

        [HttpGet(nameof(GetCountryGroup))]
        public IActionResult GetCountryGroup()
        {
            var response = iContractorTrainingService.GetCountryGroup();
            return Ok(response);
        }

        [HttpGet(nameof(DeleteContractorTraining))]
        public IActionResult DeleteContractorTraining(int Id)
        {
            var response = iContractorTrainingService.DeleteContractorTraining(Id);
            return Ok(response);
        }
        [HttpPost(nameof(AddComments))]
        public IActionResult AddComments(ContractorTrainingViewModal contractorTraining)
        {

            APIResponse response = iContractorTrainingService.AddComments(contractorTraining);
            return Ok(response);
        }
    }
}
