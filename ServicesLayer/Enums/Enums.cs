using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.Enums
{
    public class Enums
    {
        public enum APIStatus
        {
            Success,
            Failure,
            Warning,
            Exists
        }

        public enum SafetyFormType
        {
            CR,
            SHEARO,
            SMAT,
            SM,
            [Description("Chemical Request")]
            ChemicalRequest,
            [Description("Risk Assessment")]
            RA,
            [Description("Smat Action")]
            SmatAction
        }
        public enum AdminPanelFormType
        {
            sh,
            sm,
            cr,
            cm,
            ra,
            cq
        }
        public enum ModuleType
        {
            Claim,
            Safety,
            ChangeManagement,
            PillarProject,
            PillarRoadMapAction,
            StandardCompilance,
            AuditRecommendation,
            WarningAdoption,
            ChemicalRequest,
            PodeCreateTask,
            PodeFiveWhy,
            PodeQK
        }
        public enum ChangeManagementLevel
        {
            A,
            B,
            C,
            CORP,
        }

        public enum ProjectStatus
        {
            PendingForApprove = 1,
            Denied = 2,
            Approved = 3,
            PendingForComplate = 4,
            Complated = 5
        }

        public enum DepartmentType
        {
            Admin = 1,
            Lab = 2,
            Production = 3,
            Warehouse = 4,
            Maintenance = 5
        }

        public enum EventType
        {
            TF = 1,
            EvE = 2,
            SRE = 3,
            OI = 4
        }

        public enum AnswerType
        {
            YES = 1,
            NO = 0
        }

        public enum SmatImageType
        {
            Safe = 1,
            Unsafe = 2
        }

        public enum ListHistoryStage
        {
            [Description("List Created")]
            ListCreated = 1,
            [Description("List Download")]
            ListDownload = 2,
            [Description("List Revised")]
            ListRevised = 3,
        }


        public enum PillerName
        {
            [Description("H&S")]
            HnS = 1,
            [Description("ENV")]
            ENV = 2,
            [Description("REL")]
            REL = 3,
            [Description("IND")]
            IND = 4,
            [Description("QPC")]
            QPC = 5,
            [Description("CUS")]
            CUS = 6,
            [Description("PD")]
            PD = 7,
            [Description("IDG")]
            IDG = 8,
            [Description("TBM")]
            TBM = 9,
            [Description("FI")]
            FI = 10,
            [Description("STD")]
            STD = 11,
        }

        public enum FormName
        {
            [Description("SHEARO")]
            SHEARO = 1,
            [Description("SMAT")]
            SMAT = 2,
            [Description("CR")]
            CR = 3,
            [Description("RA")]
            RA = 4,
            [Description("CM")]
            CM = 5,
            [Description("Claim")]
            Claim = 6,
            [Description("Chemical Request")]
            ChemicalRequest = 7,
        }

        public enum FullFormName
        {
            [Description("SHEARO")]
            SHEARO = 1,
            [Description("SMAT")]
            SMAT = 2,
            [Description("Concerned Report")]
            CR = 3,
            [Description("RA")]
            RA = 4,
            [Description("CM")]
            CM = 5,
            [Description("Claim")]
            Claim = 6,
        }

        public enum UserActivityEvent
        {
            [Description("System Login")]
            SystemLogin = 1,
            [Description("User Created")]
            UserCreated = 2,
            [Description("User Deleted")]
            UserDeleted = 3,
            [Description("User Enabled")]
            UserEnabled = 4,
            [Description("User Disabled")]
            UserDisabled = 5,
            [Description("User Roles Updated")]
            UserRolesUpdated = 6,
            [Description("User Plants Updated")]
            UserPlantsUpdated = 7,
            [Description("User Form Access Updated")]
            UserFormAccessUpdated = 8,
            [Description("User Plants Created")]
            UserPlantsCreated = 9,
            [Description("User Form Access Created")]
            UserFormAccessCreated = 10,
            [Description("User Roles Created")]
            UserRolesCreated = 11,
        }
        public enum RecordActivity
        {
            [Description("Created")]
            Created = 1,
            [Description("Updated")]
            Updated = 2,
            [Description("Closed")]
            Closed = 3
        }

        public enum ClaimRecordDetail
        {
            [Description("was created")]
            Created = 1,
            [Description("Initial Review sheet was updated")]
            InitialReview = 2,
            [Description("Investigation sheet was updated")]
            Investigation = 3,
            [Description("Final Review sheet was updated")]
            FinalReview = 4,
            [Description("was closed")]
            Close = 5,

            [Description("Initial defect photos from Salesman was uploaded")]
            InitialDefectPhotos = 6,
            [Description("Supporting documentation was uploaded")]
            SupportingDocumentation = 7,
            [Description("Defect Photos from Site Visit was uploaded")]
            DefectPhotos = 8,
            [Description("Investigation Supporting Documentation was uploaded")]
            InvestigationSupportingDocumentation = 9,
            [Description("QK - How Made Photos was uploaded")]
            QKHowMadePhotos = 10,
            [Description("QK - Why Shipped Photos was uploaded")]
            QKWhyShippedPhotos = 11,

            [Description("Initial defect photos from Salesman was deleted")]
            InitialDefectPhotosDelete = 12,
            [Description("Supporting documentation was deleted")]
            SupportingDocumentationDelete = 13,
            [Description("Defect Photos from Site Visit was deleted")]
            DefectPhotosDelete = 14,
            [Description("Investigation Supporting Documentation was deleted")]
            InvestigationSupportingDocumentationDelete = 15,
            [Description("QK - How Made Photos was deleted")]
            QKHowMadePhotosDelete = 16,
            [Description("QK - Why Shipped Photos was deleted")]
            QKWhyShippedPhotosDelete = 17,

        }


        public enum CrRecordDetail
        {
            [Description("was created")]
            Created = 1,
            [Description("Initial Review sheet was updated")]
            InitialReview = 2,
            [Description("Risk reduction plan was updated")]
            RiskReductionPlan = 3,
            [Description("Final Review sheet was updated")]
            FinalReview = 4,
            [Description("was closed")]
            Close = 5,

            [Description("Event Photos from Initial Review was uploaded")]
            EventPhotosInitialReview = 6,
            [Description("Record Supporting Documentation was uploaded")]
            SupportingDocumentation = 7,
            [Description("Reduction Plan Completion Photos was uploaded")]
            ReductionPlanCompletionPhotos = 8,

            [Description("Event Photos from Initial Review was deleted")]
            EventPhotosInitialReviewDelete = 12,
            [Description("Record Supporting Documentation was deleted")]
            SupportingDocumentationDelete = 13,
            [Description("Reduction Plan Completion Photos was deleted")]
            ReductionPlanCompletionPhotosDelete = 14,
            [Description("Reduction Plan Supporting Photos was uploaded")]
            ReductionPlanSupportingPhotos = 15,
        }

        public enum RecordDetailEvent
        {
            [Description("Record Created Notification Sent")]
            RecordCreatedNotificationSent = 1,
            [Description("Record Created")]
            RecordCreated = 2
        }
        public enum FrequencyOfRiskKey
        {
            [Description("1")]
            Frequent = 1,
            [Description("0.21")]
            Rare = 2,
            [Description("0.6")]
            Occasional = 3,
            [Description("0.32")]
            Unusual = 4
        }

        public enum DefaultEstimatedHours
        {
            SMAT = 1,
        }

        public enum SmatType
        {
            [Description("General")]
            General = 1,
            [Description("Key Point")]
            KeyPoint = 2
        }

        public enum Roles
        {
            [Description("b14011b3-96f3-4a42-a956-6f326883ddfb")]
            Manager = 1,
        }

        public enum ModuleId
        {
            [Description("Health & Safety")]
            HealthAndSafety = 1,
            [Description("Policy Deployment")]
            PolicyModuleId = 17,
            [Description("Claim")]
            ClaimId = 18,
            [Description("Change Management")]
            ChangeManagement = 19
        }
    }
}
