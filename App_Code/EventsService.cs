using System;
using System.Collections.Generic;
using System.Web;

using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using System.Net;

using EventsCalendarLibrary;
using System.Data;
using System.Runtime.Serialization.Json;

/// <summary>
/// Summary description for EventsService
/// </summary>
/// 
///http://www.newtonsoft.com/json/help/html/SerializingJSON.htm
///

[WebService(Namespace = "http://tempuri.org")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class EventsService : System.Web.Services.WebService
{

    public EventsService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod, ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void  GetAllEvents()
    {

        EventsCalendar myEventClass = new EventsCalendar();

        List<EventsCalendar> myFDSEvents = myEventClass.getAllEvents();
        string s = string.Empty;
       
        try
        {
           
            System.Web.Script.Serialization.JavaScriptSerializer j = new System.Web.Script.Serialization.JavaScriptSerializer();

            this.Context.Response.ContentType = "application/json; charset=utf-8";
            this.Context.Response.Write(j.Serialize(myFDSEvents));
         
           // s = j.Serialize(myFDSEvents);
        }
        catch { 
        }
     //  return string.Empty;


    }


    [WebMethod, ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string putEvent(int EventId, string EventName, string EventDescription, string EventVenue, int EventRegionId  )
    {
        string myReturn = string.Empty;
        EventsCalendar myEventClass = new EventsCalendar();
        int myNewEventId = 0;
      
        try {
            //var deserializedEvent = System.Web.HttpContext.Current.Request.Form["event"] as string;
            //var newevent = JsonConvert.DeserializeObject<string>(deserializedEvent);

           
            myEventClass.EventName = EventName;
            myEventClass.EventDescription = EventDescription;
            myEventClass.EventVenue = EventVenue;
            myEventClass.EventRegionId = EventRegionId;
            // CALL DATABASE PUT
            myNewEventId = EventsCalendarData.putEvent(myEventClass);
            this.Context.Response.ContentType = "application/json; charset=utf-8";
            System.Web.Script.Serialization.JavaScriptSerializer j = new JavaScriptSerializer();
            //  this.Context.Response.Write(j.Serialize(myEventClass));
            myEventClass.EventId = myNewEventId;

            myReturn = j.Serialize(myEventClass);
            //eveInserted = insert new event()
        }
        catch (Exception ex1) {
            myReturn = ex1.ToString();
        }

          return myReturn;
        }
   
    [WebMethod, ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string  deleteEvent(int EventId)
    {
        string myReturn = string.Empty;
          string httpType = string.Empty;
        int mySuccess = 0;
        try
        {
            EventsCalendar myEventClass = new EventsCalendar();
            myEventClass.EventId = EventId;

            // CALL DELETE EVENT
            //var deserializedEvent = System.Web.HttpContext.Current.Request.Form["event"] as string;
            //var newevent = JsonConvert.DeserializeObject<string>(deserializedEvent);
            //httpType = HttpContext.Current.Request.HttpMethod.ToString();

             this.Context.Response.ContentType = "application/json; charset=utf-8";
             System.Web.Script.Serialization.JavaScriptSerializer j = new JavaScriptSerializer();
            mySuccess = EventsCalendarData.deleteEvent(myEventClass);
            //this.Context.Response.Write(j.Serialize(myEventClass));
            myReturn = j.Serialize(mySuccess);
            //myReturn = "0";
        }
        catch (Exception ex)
        {
            httpType = ex.ToString();
            myReturn = "-1";
        }

        return myReturn;
      //  return myReturn;
        //return Request.CreateResponse(HttpStatusCode.OK, msg);
    }
    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>

    [WebMethod, ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<EventsCalendar> GetAllEventsList()
    {

        EventsCalendar myEventClass = new EventsCalendar();

        List<EventsCalendar> myFDSEvents = myEventClass.getAllEvents();
        string s = string.Empty;

        try
        {
            myEventClass.EventId = EventsCalendarData.putEvent(myEventClass);

            System.Web.Script.Serialization.JavaScriptSerializer j = new System.Web.Script.Serialization.JavaScriptSerializer();

            s = j.Serialize(myFDSEvents);
        }
        catch
        {
        }
        return myFDSEvents;


    }

    //FDSEvent myEventClass = new FDSEvent();

    //List<FDSEvent> myFDSEvents = myEventClass.getAllEvents();
    //string s = string.Empty;
    //int myEventId = 0;
    //try
    //{

    //    System.Web.Script.Serialization.JavaScriptSerializer j = new JavaScriptSerializer();

    //    this.Context.Response.ContentType = "application/json; charset=utf-8";
    //   // 'this.Context.Response.Write(j.Serialize(myFDSEvents));
    //      this.Context.Response.Write(j.Serialize(myEventId));

    //    //  s = j.Serialize(myFDSEvents);
    //    //myEventId = myEventClass.EventId;
    //}
    //catch(Exception ex)
    //{
    //   // NLog.Logger(ex);
    //}
    ////return myEventId;

    [WebMethod, ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string  HelloWorld()
    {
        string myReturnValue = "Hello World";

        System.Web.Script.Serialization.JavaScriptSerializer j = new System.Web.Script.Serialization.JavaScriptSerializer();

        string s = j.Serialize(myReturnValue);

        return s;

    }

}
