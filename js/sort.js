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

var find_sport = function(wordToMatch, array_of_objects_to_query) {
  var regular_expression = new RegExp(wordToMatch)
  console.log('regular_expression:' + regular_expression)
  var results = []
  for ( var i = 0; i < array_of_objects_to_query.length; i++ )
    {
      if ( regular_expression.test(array_of_objects_to_query[i].name) ) {
            console.log(array_of_objects_to_query)
            results.push(array_of_objects_to_query[i])
         }
    }
  return results
}

console.log(find_sport('a', [{name: 'aasf'},{name: 'bsa'},{name: 'c'}]))

var SearchBar = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
    var value = event.target.value;
    console.log("Found sports: " + find_sport(value, sports_array));
    this.refs.sports_list.setState({sports: find_sport(value, sports_array)});
    console.log(sports_array);
  },
  render: function() {
    return(
      <div>
        <input type="text" placeholder="Search for your sport" value={this.state.value} onChange={this.handleChange} />
        <SportsOptions sports={sports_array} ref="sports_list"/>
      </div>
      )
  }
})

var SportsOptions = React.createClass({
  getInitialState: function() {
      return { sports: [] };
    },
  componentDidMount: function(){
      return { sports: this.props.sports };
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
    // TBU - should add an element to the keep div
  }
})



ReactDOM.render(
  <SearchBar sports={sports_array} />,
  document.getElementById('main')
  );
