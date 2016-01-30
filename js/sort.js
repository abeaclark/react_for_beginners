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

var regex = function(wordToMatch, array_to_query) {
  var regular_expression = new RegExp("#" + wordToMatch + "#", "g")
  for ( var i = 0; i < array_to_query.length; i++ )
    {
      var result
      if ( regular_expression.test(array_to_query[i]) ) {
            result[j] = array_to_query[i]
            j++
         }
      return result
    }
}

var SearchBar = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
    var value = this.state.value
    this.refs.sportsoptions.setState({sports: regex(value, sports_array)});
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
    if (sports.length) {
      return(
        <ul>{this.state.sports.map(function(sport, i) {
            return (
              <li key={i} onClick={this.handleClick.bind(this, i)}>{sport.name}</li>
              );
            }, this)}
        </ul>
        )
      };
  },
  handleClick: function(i) {
    // TBU - should add an element to the keep div
  }
})



ReactDOM.render(
  <SearchBar sports={sports_array} />,
  document.getElementById('main')
  );
