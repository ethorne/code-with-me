import React from 'react';

class CodeWithMe extends React.Component {

  constructor(props) {
    super(props);
    this.state =  { data: { } }
  }

  render() {
    console.log('\n\n\n\t\tLOADED\n\n\n');
    return (
      <div className="code-with-me">
        <h1>hello world!</h1>
      </div>
    );
  }

}

export default CodeWithMe;
