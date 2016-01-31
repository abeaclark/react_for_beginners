var Profile = React.createClass({
  render: function() {
    return(
      <div class="row">
        <img className="profile_picture" alt="Profile Picture" />
        <div className="profile_headline">
          <h1 className="pull-left"></h1>
          <h1 className="pull-right"></h1>
        </div>
        <div class="clearfix"></div>
        <hr />
      </div>
      )
  }
})

ReactDOM.render(
  <Profile url="TBU"/>,
  document.getElementById('main')
  );
