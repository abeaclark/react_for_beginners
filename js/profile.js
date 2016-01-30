// Current data source
// To be replaced with AJAX call, etc.
var user = {
  "first_name": "Abe",
  "last_name": "Clark",
  "age": 18,
  "profile_picture_url": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/6/005/096/07c/1427c21.jpg",
  "blurb": "I am Abe and I love this App.",
  "sports": [
      {"name": "Wrestling", "blurb": "I love Wrestling"},
      {"name": "Baseball", "blurb": "Baseball is life"},
      {"name": "Running", "blurb": "Run or DIEEEEEEE"},
      {"name": "Snorkeling", "blurb": "I can swim"},
      {"name": "Tag", "blurb": "I want to play tag with Greg"},
      {"name": "Eating", "blurb": "Nom Nom Nom"},
    ]
  }

// Components are nested. Best practice is to pass the least amount of data
// you can to each successive layer
// The componenets here are layed out as follows
// Main(on HTML page) >> Profile >> Sports >> Blurb

// The function that iniatiates everything is the React.DOM.render function
// at the bottom of the page. Go there now to see what's going on.

// Explanation of Profile class:
// the ".props.user" references the user we passed in during the React.DOM.render function
// We could pass the entire user, but best practice is to limit scope as much as you can
// The array of sports will be used inside the Sports class below

var Profile = React.createClass({
  render: function() {
    return(
      <div class="row">
        <img className="profile_picture" src={this.props.user.profile_picture_url} alt="Profile Picture" />
        <div className="profile_headline">
          <h1 className="pull-left">{this.props.user.first_name}</h1>
          <h1 className="pull-right">{this.props.user.age}</h1>
        </div>
        <div class="clearfix"></div>
        <hr />
        <Sports sports={user.sports} />
      </div>
      )
  }
})

// Explanation of Sports class:
// We grab the sports array and iterate over it using .map
// I believe the first argument is similar to the "|thing|" in an .each statement
// the second argument seems to be an index

// It is best practice to assign a key of an index to items generated through iteration
// that is what we do with key={i}
// This allows you to reference them later
// The onClick references the function "handleClick" that we define later in this object

// We call the Blurb class and pass it the user's biography
var Sports = React.createClass({
  render: function() {
    return(
      <div>
        <ul>
        {this.props.sports.map(function(sport, i) {
            return (
              <li type="button" className="btn btn-info profile_sports" key={i} onClick={this.handleClick.bind(this, i)}>{sport.name}</li>
              );
            }, this)}
        </ul>
        <hr />
        <Blurb ref="blurb_div" blurb={user.blurb} />
        <hr />
      </div>
      )
  },
  // The following logic fires when one of the sports is clicked
  // Notice that it uses the variable "i" that we assigned as a key above for each <li>
  //We pass in just the blurb to keep it as precise as possible
  handleClick: function(i) {
    this.refs.blurb_div.setState({blurb: this.props.sports[i].blurb})
  }
})


var Blurb = React.createClass({
  // Since the blurb will be updated onClick, we give it a state
  // We use state, because props are "immutable", but state can change
  // The initial state is the blurb we passed in above
  getInitialState : function() {
    return {
      blurb: this.props.blurb
    };
  },
  // Here, we use this.state.blurb instead of this.props.blurb
  // If we used this.props.blurb, we wouldn't be able to update it
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
// This passes in user as a "prop" (the user in brackets references the object I define at the top)
ReactDOM.render(
  <Profile user={user} />,
  document.getElementById('main')
  );
