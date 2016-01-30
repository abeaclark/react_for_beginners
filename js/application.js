// Current data source
// To be replaced with AJAX call, etc.
var user = {
  "first_name": "Abe",
  "last_name": "Clark",
  "profile_picture_url": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/6/005/096/07c/1427c21.jpg",
  "blurb": "I am Abe and I love this App.",
  "sports": [
      {"name": "Wrestling", "blurb": "I love Wrestling"},
      {"name": "Baseball", "blurb": "Baseball is life"},
      {"name": "Running", "blurb": "Run or DIEEEEEEE"},
    ]
  }

// Components are nested. Best practice is to pass the least amount of data
// you can to each successive layer
// The componenets here are layed out as follows
// Main(on HTML page) >> Profile >> Sports >> Blurb

// The function that iniatiates everything is the React.DOM.render function
// at the bottom of the page. Go there now to see what's going on.

var Profile = React.createClass({
  render: function() {
    return(
      <div>
        // the ".props.user" references the user we passed in during the React.DOM.render function
        <p>Hello, this is {this.props.user.first_name}</p>
        <img src={this.props.user.profile_picture_url} alt="Profile Picture" />
        // We could pass the entire user, but best practice is to limit scope as much as you can
        // The array of sports will be used inside the Sports class below
        <Sports sports={user.sports} />
      </div>
      )
  }
})

var Sports = React.createClass({
  render: function() {
    return(
      <div>
      // Here we grab the sports array and iterate over it using .map
      // I believe the first argument is similare to the "|thing|" in an .each statement
      // the second argument seems to be an index
        <ul>{this.props.sports.map(function(sport, i) {
            return (
              // It is best practice to assign a key of an index to items generated through iteration
              // that is what we do with key={i}
              // The onClick references the function "handleClick" that we define later in this object
              <li key={i} onClick={this.handleClick.bind(this, i)}>{sport.name}</li>
              );
            }, this)}
        </ul>
        <p>Description</p>
        // Here we call the Blurb class and pass it the user's biography
        <Blurb ref="blurb_div" blurb={user.blurb} />
      </div>
      )
  },
  // TBU
  handleClick: function(i) {
    // console.log('You clicked: ' + this.props.sports[i].name)
    this.refs.blurb_div.setState({blurb: this.props.sports[i].blurb})
  }
})

var Blurb = React.createClass({
  getInitialState : function() {
    return {
      blurb: this.props.blurb
    };
  },

  render: function() {
    return(
      <div>
        {this.state.blurb}
      </div>
      )
  }
});

// This function appends the "Profile" component to the #main element
// of the existing HTML page
ReactDOM.render(
  // This passes in user as a "prop" (the user in brackets references the object I define at the top)
  <Profile user={user} />,
  document.getElementById('main')
  );
