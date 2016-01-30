// Current data source
// To be replaced with AJAX call, etc.
var sports_array = [
      {"name": "Wrestling"},
      {"name": "Baseball"},
      {"name": "Running"},
      {"name": "Chess"},
      {"name": "Badmitten"},
      {"name": "Tennis"},
      {"name": "Squash"},
      {"name": "Raquetball"},
      {"name": "Football"},
      {"name": "Climbing"},
      ]


// Organization:
// find_sport -- helper function to perform regex search
// MainContainer >> SportsOptions, MySports
//

var find_sport = function(wordToMatch, array_of_objects_to_query) {
  var regular_expression = new RegExp(wordToMatch, 'i')
  var results = []
  for ( var i = 0; i < array_of_objects_to_query.length; i++ )
    {
      if ( regular_expression.test(array_of_objects_to_query[i].name) ) {
            results.push(array_of_objects_to_query[i])
         }
    }
  return results
}

var MainContainer = React.createClass({
  getInitialState: function() {
    return {value: '', mySports: []};
  },
  componentDidMount: function() {
    this.refs.search.focus();
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
    var value = event.target.value;
    this.refs.sports_list.setState({sports: find_sport(value, sports_array)});
  },
  setMySports: function(index) {
    var sportToAdd, currentSports
    sportToAdd = sports_array[index]
    console.log(sportToAdd)
    currentSports = this.state.mySports.slice()
    currentSports.push(sportToAdd)
    console.log(currentSports)
    this.setState({mySports: currentSports})
    console.log(this.state.mySports)
    // this.setState({mySports: currentSports.push(sportToAdd)})
  },
  render: function() {
    return(
      <div>
        <ChosenSports mySports={this.state.mySports} ref="mySports"/>
        <h4>Add a sport</h4>
        <input type="text" ref="search" placeholder="Search for your sport" value={this.state.value} onChange={this.handleChange} />
        <SportsOptions sports={sports_array} ref="sports_list" onChange={this.setMySports}/>
      </div>
      )
  }
})

var SportsOptions = React.createClass({
  getInitialState: function() {
      return { sports: this.props.sports};
    },
  render: function() {
      if(this.state.sports.length) {
      return(
          <ul>{this.state.sports.map(function(sport, i) {
              return (
                <li key={i} onClick={this.handleClick.bind(this, i)}>{sport.name}</li>
                );
              }, this)}
          </ul>
       )
    } else { return null };
  },
  handleClick: function(i) {
    this.props.onChange(i);
  }
});

var ChosenSports = React.createClass({
  // getInitialState: function() {
  //     return { mySports: this.props.mySports };
  //   },
  render: function() {
      if(this.props.mySports.length) {
      return(
        <div>
          <h4>My sports</h4>
          <ul>{this.props.mySports.map(function(sport, i) {
              return (
                <li key={i} onClick={this.handleClick.bind(this, i)}>{sport.name}</li>
                );
              }, this)}
          </ul>
        </div>
       )
    } else { return null };
  },
  handleClick: function(i) {
    // TBU - show your blurb?
  }
})




ReactDOM.render(
  <MainContainer sports={sports_array} />,
  document.getElementById('main')
  );
