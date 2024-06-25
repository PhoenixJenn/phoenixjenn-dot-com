
var myApp = angular.module('pjApp', ['ui.bootstrap']);

myApp.controller('racesController', ['$scope', function ($scope) {
    $scope.races = [
        {
            name: 'Disney Goofy', racedate: '2010', racelocation: 'Orlando', raceseries: 'runDisney', racename: 'Goofy',
            racedistance: '39.3', racetype: 'challenge', racemedal: 'GoofyChallenge2010.jpg', racemonth: 'Jan'
        },
        {
            name: 'Disney Goofy', racedate: '2014', racelocation: 'Orlando', raceseries: 'runDisney', racename: 'Goofy',
            racedistance: '39.3', racetype: 'challenge', racemedal: 'GoofyChallenge2014.jpg', racemonth: 'Jan'
        },
          {
              name: 'Mickey Full', racedate: '2014', racelocation: 'Orlando', raceseries: 'runDisney', racename: 'Mickey',
              racedistance: '39.3', racetype: 'Full', racemedal: 'MickeyFull2014.jpg', racemonth: 'Jan'
          },
           {
               name: 'Mickey Full', racedate: '2010', racelocation: 'Orlando', raceseries: 'runDisney', racename: 'Mickey',
               racedistance: '39.3', racetype: 'Full', racemedal: 'MickeyFull2010.jpg', racemonth: 'Jan'
           },
         {
             name: 'Donald Half', racedate: '2016', racelocation: 'Orlando', raceseries: 'runDisney', racename: 'Donald',
             racedistance: '13.1', racetype: 'Half', racemedal: 'DonaldHalf2016.jpg', racemonth: 'Jan'
         },
         {
             name: 'Donald Half', racedate: '2014', racelocation: 'Orlando', raceseries: 'runDisney', racename: 'Donald',
             racedistance: '13.1', racetype: 'Half', racemedal: 'DonaldHalf2014.jpg', racemonth: 'Jan'
         },
         {
             name: 'Donald Half', racedate: '2010', racelocation: 'Orlando', raceseries: 'runDisney', racename: 'Donald',
             racedistance: '13.1', racetype: 'Half', racemedal: 'DonaldHalf2010.jpg', racemonth: 'Jan'
         },
         {
             name: 'Minnie 10k', racedate: '2015', racelocation: 'Orlando', raceseries: 'runDisney', racename: 'Minnie',
             racedistance: '6.2', racetype: '10k', racemedal: 'Minnie10k.jpg', racemonth: 'Jan'
         },
         {
             name: 'Pluto 5k', racedate: '2016', racelocation: 'Orlando', raceseries: 'runDisney', racename: '',
             racedistance: '3.1', racetype: '5k', racemedal: 'Pluto5K2016.jpg', racemonth: 'Jan'
         },
          {
              name: 'Mickey Halloween 5k', racedate: '2014', racelocation: 'Orlando', raceseries: 'runDisney', racename: '',
              racedistance: '3.1', racetype: '5k', racemedal: 'MickeyHalloween5k.jpg', racemonth: 'Oct'
          },
           {
               name: 'Halloween 5k Trail Run', racedate: '2014', racelocation: 'Orlando', raceseries: 'runDisney', racename: '',
               racedistance: '3.1', racetype: '5k', racemedal: 'HauntedTrailRun5K2014.jpg', racemonth: 'Oct'
           },
         {
             name: 'Tower of Terror 10M', racedate: '2014', racelocation: 'Orlando', raceseries: 'runDisney', racename: 'Tower of Terror',
             racedistance: '10', racetype: '10m', racemedal: 'TowerOfTerror10m2014.jpg', racemonth: 'Oct'
         },
         {
             name: 'Tower of Terror 13k', racedate: '2008', racelocation: 'Orlando', raceseries: 'runDisney', racename: 'Tower of Terror',
             racedistance: '13', racetype: '13k', racemedal: 'TowerOfTerror13k.jpg', racemonth: 'Oct'
         },
          {
              name: 'Wine & Dine', racedate: '2008', racelocation: 'Orlando', raceseries: 'runDisney', racename: '',
              racedistance: '13.1', racetype: 'Half', racemedal: 'WineDineHalf2010.jpg', racemonth: 'Nov'
          },
         {
             name: 'Star Wars Dark Side Challenge', racedate: '2016', racelocation: 'Orlando', raceseries: 'runDisney', racename: '',
             racedistance: '19.3', racetype: 'challenge', racemedal: 'DarkSideChallenge2016.jpg', racemonth: 'Apr'
         },
         {
             name: 'Star Wars Dark Side 5k', racedate: '2016', racelocation: 'Orlando', raceseries: 'runDisney', racename: '',
             racedistance: '3.1', racetype: '5k', racemedal: 'StarWars5k2016.jpg', racemonth: 'Apr'
         },
         {
             name: 'Star Wars Dark Side 10k', racedate: '2016', racelocation: 'Orlando', raceseries: 'runDisney', racename: '',
             racedistance: '6.2', racetype: '10k', racemedal: 'StarWars10k.jpg', racemonth: 'Apr'
         },

      
       {
           name: 'Rock Roll', racedate: '2008', racelocation: 'Arizona', raceseries: 'RocknRoll', racename: 'RnR Arizona',
           racedistance: '13.1', racetype: 'Half', racemedal: 'RnRAz.jpg', racemonth: 'Jan'
       },
        {
            name: 'Rock Roll', racedate: '2015', racelocation: 'Brooklyn', raceseries: 'RocknRoll', racename: 'RnR Brooklyn',
            racedistance: '13.1', racetype: 'Half', racemedal: 'RnRBrooklyn15.jpg', racemonth: 'Sept'
        },
        {
            name: 'Rock Roll', racedate: '2011', racelocation: 'Miami', raceseries: 'RocknRoll', racename: 'RnR Miami',
            racedistance: '13.1', racetype: 'Half', racemedal: 'RnRMiami11.jpg', racemonth: 'Oct'
        },
{
    name: 'Rock Roll', racedate: '2012', racelocation: 'Miami', raceseries: 'RocknRoll', racename: 'RnR Miami',
    racedistance: '13.1', racetype: 'Half', racemedal: 'RnRMiami12.jpg', racemonth: 'Oct'
},
        {
            name: 'Rock Roll', racedate: '2015', racelocation: 'Nashville', raceseries: 'RocknRoll', racename: 'Country Music Nashville',
            racedistance: '13.1', racetype: 'Half', racemedal: 'RnRNashville15.jpg', racemonth: 'Oct'
        },
        {
            name: 'Rock Roll ', racedate: '2015', racelocation: 'Philadelphia', raceseries: 'RocknRoll', racename: 'RnR Philadelphia',
            racedistance: '13.1', racetype: 'Half', racemedal: 'RnRPhilly15.jpg', racemonth: 'Oct'
        },
        {
            name: 'Rock Roll ', racedate: '2014', racelocation: 'Philadelphia', raceseries: 'RocknRoll', racename: 'RnR Philadelphia 5k',
            racedistance: '3.1', racetype: '5k', racemedal: 'RnRPhilly14.jpg', racemonth: 'Sept'
        },
        {
            name: 'Rock Roll ', racedate: '2014', racelocation: 'Philadelphia', raceseries: 'RocknRoll', racename: 'RnR Philadelphia',
            racedistance: '13.1', racetype: 'Half', racemedal: 'RnRPhilly14.jpg', racemonth: 'Sept'
        },
        {
            name: 'Rock Roll ', racedate: '2016', racelocation: 'Philadelphia', raceseries: 'RocknRoll', racename: 'RnR Philadelphia',
            racedistance: '13.1', racetype: 'Half', racemedal: 'RnRPhilly16.jpg', racemonth: 'Sept'
        },

         {
             name: 'Rock Roll ', racedate: '2011', racelocation: 'Providence', raceseries: 'RocknRoll', racename: 'RnR Providence',
             racedistance: '13.1', racetype: 'Half', racemedal: 'RnRProvidence11.jpg', racemonth: 'Aug'
         },
        {
            name: 'Rock Roll ', racedate: '2012', racelocation: 'Providence', raceseries: 'RocknRoll', racename: 'RnR Providence',
            racedistance: '13.1', racetype: 'Half', racemedal: 'RnRProvidence12.jpg', racemonth: 'Aug'
        },
        {
            name: 'Rock Roll ', racedate: '2008', racelocation: 'San Antonio', raceseries: 'RocknRoll', racename: 'RnR San Antonio',
            racedistance: '13.1', racetype: 'Half', racemedal: 'RnRSanAntionio08.jpg', racemonth: 'Nov'
        },
         {
             name: 'Rock Roll', racedate: '2012', racelocation: 'Las Vegas', raceseries: 'RocknRoll', racename: 'RnR Las Vegas',
             racedistance: '13.1', racetype: 'Half', racemedal: 'RnRVegas12.jpg', racemonth: 'Nov'
         },
        {
            name: 'Rock Roll', racedate: '2013', racelocation: 'Las Vegas', raceseries: 'RocknRoll', racename: 'RnR Las Vegas',
            racedistance: '13.1', racetype: 'Half', racemedal: 'RnRVegas13.jpg', racemonth: 'Nov'
        },
        {
            name: 'Rock Roll', racedate: '2014', racelocation: 'Las Vegas', raceseries: 'RocknRoll', racename: 'RnR Las Vegas',
            racedistance: '13.1', racetype: 'Half', racemedal: 'RnRVegas15.jpg', racemonth: 'Nov'
        },
         {
             name: 'Rock Roll', racedate: '2015', racelocation: 'Las Vegas', raceseries: 'RocknRoll', racename: 'RnR Las Vegas',
             racedistance: '13.1', racetype: 'Half', racemedal: 'RnRVegas15.jpg', racemonth: 'Nov'
         },
        {
            name: 'Rock Roll', racedate: '2015', racelocation: 'Las Vegas', raceseries: 'RocknRoll', racename: 'RnR Las Vegas 5k',
            racedistance: '3.1', racetype: '5k', racemedal: 'RnRVegas15.jpg', racemonth: 'Nov'
        },
        
        {
            name: 'Boston Marathon', racedate: '2009', racelocation: 'Boston', raceseries: 'BAA', racename: '',
            racedistance: '26.2', racetype: 'Full', racemedal: 'BostonMarathon2009.jpg', racemonth: 'Apr'
        },
        {
            name: 'BAA Half Marathon', racedate: '2009', racelocation: 'Boston', raceseries: 'BAA', racename: '',
            racedistance: '13.1', racetype: 'Half', racemedal: 'BAAHalf2009.jpg', racemonth: 'Oct'
        },
        {
            name: 'BAA Half Marathon', racedate: '2012', racelocation: 'Boston', raceseries: 'BAA', racename: '',
            racedistance: '13.1', racetype: 'Half', racemedal: 'BAAHalf2012.jpg', racemonth: 'Oct'
        }
    ];

   
  
}]);


//function CarouselDemoCtrl($scope) {
//    $scope.myInterval = 3000;
//    $scope.noWrapSlides = false;
//    $scope.activeSlide = 0;
//    $scope.slides = [
//        { name: 'Disney Goofy', racedate: '2010', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '39.3', racetype: 'challenge', racemedal: '' },
//        { name: 'Disney Goofy', racedate: '2014', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '39.3', racetype: 'challenge', racemedal: '' },
//         { name: 'Donald Half', racedate: '2015', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '13.1', racetype: 'Half', racemedal: '' },
//         { name: 'Minnie 10k', racedate: '2015', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '6.2', racetype: '10k', racemedal: '' },
//         { name: 'Pluto 5k', racedate: '2015', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '3.1', racetype: '5k', racemedal: '' },
//          { name: 'Halloween 5k', racedate: '2014', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '3.1', racetype: '5k', racemedal: '' },
//           { name: 'Halloween 5k Trail Run', racedate: '2014', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '3.1', racetype: '5k', racemedal: '' },
//         { name: 'Tower of Terror 10M', racedate: '2014', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '10', racetype: '10m', racemedal: '' },
//         { name: 'Tower of Terror 13k', racedate: '2008', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '13', racetype: '13k', racemedal: '' },
//          { name: 'Wine & Dine', racedate: '2008', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '13.1', racetype: 'Half', racemedal: '' },
//         { name: 'Star Wars Dark Side Challenge', racedate: '2016', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '19.3', racetype: 'challenge', racemedal: '' },
//         { name: 'Star Wars Dark Side 5k', racedate: '2016', racelocation: 'Orlando', raceseries: 'runDisney', racedistance: '3.1', racetype: 'challenge', racemedal: '' },
//        { name: 'Rock Roll', racedate: '2015', racelocation: 'Las Vegas', raceseries: 'Rock n Roll Series', racedistance: '3.1', racetype: '5k', racemedal: '' },
//        { name: 'Rock Roll ', racedate: '2015', racelocation: 'Philadelphia', raceseries: 'Rock n Roll Series', racedistance: '13.1', racetype: 'Half', racemedal: '' },
//        { name: 'Rock Roll ', racedate: '2015', racelocation: 'Philadelphia', raceseries: 'Rock n Roll Series', racedistance: '3.1', racetype: '5k', racemedal: '' },
//        { name: 'Rock Roll ', racedate: '2015', racelocation: 'Philadelphia', raceseries: 'Rock n Roll Series', racedistance: '13.1', racetype: 'Half', racemedal: '' },
//        { name: 'Boston Marathon', racedate: '2009', racelocation: 'Boston', raceseries: 'BAA', racedistance: '13.1', racetype: 'Half', racemedal: '' }
//    ];

//}

 
   