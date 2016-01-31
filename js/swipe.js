var React = require('react'),
    Tinderable = require('react-tinderable');

var data = [
  {title: '', text: '', id: '', image: ''}
];

React.render(
    <Tinderable initialCardsData={data} />,
    document.body
);
