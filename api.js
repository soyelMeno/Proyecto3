//const [equipos, setEquipos]=useState('')
//const [games, setGames] =useState('')
let teamsdata=[]
let gamesdata=[]
let teams2=[]
let games=[]
let equipos=[]
let puntos=[]
const ctx = document.getElementById('myChart');

function openNav(){
  document.getElementById("mobile-menu").style.width = "100%";
}

function closeNav(){
  document.getElementById("mobile-menu").style.width = "0%";
}

function createGraphic(teams2){
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: equipos,
      datasets: [{
        label: 'Puntos',
        data: puntos,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}


  const getTeams = () =>{
      return fetch('https://www.balldontlie.io/api/v1/teams/')
        .then((e)=>e.json())
        .then((data) => {
          teamsdata=data.data
          //console.log(teamsdata)
          filterTeams(teamsdata)
      })
        .catch(error => console.log('getteams', error));
  }
  const getGames =()=>{
    return fetch ('https://www.balldontlie.io/api/v1/games/?seasons[]=2022&&per_page=100')
      .then((e)=>e.json())
      .then((data)=>{
        gamesdata=data.data
        console.log(gamesdata,teamsdata)
        filterPoints(gamesdata)
      })
      .catch (error => console.log('getgames',error))
  }

  getTeams()
  getGames()

  function filterTeams(teamsdata){
    const teams = teamsdata.map(team => {         
      return {             
        abbreviation: team.abbreviation,
        points: 0      
      };     
    });
    teams2=teams
  }

  function filterPoints(gamesdata){
    console.log(23,teams2.length,gamesdata.length)
    for(i=0;i<gamesdata.length;i++){
      for(j=0;j<teams2.length;j++){
        //Si el equipo local coincide con la posición J de teams2 sumar los puntos
        if (gamesdata[i].home_team.abbreviation == teams2[j].abbreviation){
          teams2[j].points+=gamesdata[i].home_team_score
        //Si el equipo visitante coincide con la posición J de teams2 sumar los puntos
        }else if (gamesdata[i].visitor_team.abbreviation == teams2[j].abbreviation){
          teams2[j].points+=gamesdata[i].visitor_team_score
        }
      }
    }
    //Ordenar por puntos
    teams2.sort((a, b) => a.points - b.points);
    for(i=0;i<teams2.length;i++){
      equipos.push(teams2[i].abbreviation)
      puntos.push(teams2[i].points)
    }

    console.log(teams2)
    createGraphic(teams2)
  }