import React from 'react';
import logo from './logo.svg';
import './App.css';
import Locker from './components/Locker';
//import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css-offline';
import { Grid, Icon, Transition, Reveal, Modal, Image } from 'semantic-ui-react';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lockers: null,
			locks: null,//Array(lockers.length).fill(null),
			locked: true
		};
		this.lockersPromise = fetch('config.json')
		.then((r) => {
			return r.json();
		})
		.then((j) => {
			const lockers = j.codes;
			this.setState({ lockers: j.codes, locks: Array(j.codes.length) });
		});
	}

	handleLock(i) {
		return (l) => {
			var { locks } = this.state;
			locks[i] = l;
			this.setState({ locks });
			this.setState({ locked: !locks.reduce((acc, l, i) => acc && locks[i], true) });
		}
	}

	render() {
		const { locked, lockers } = this.state;
  return (
    <div className="App">
      <header className="App-header">
        <Grid>
	  <Grid.Row columns={1}>
	    <Grid.Column>
          { locked && <Icon name='lock' color='red' size='large'/> }
          { !locked && <Modal trigger={<Icon name='unlock' color='green' size='large' link/>}>
			  <Modal.Header>Félicitation !</Modal.Header>
			  <Modal.Content image>
			  	<Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
			  </Modal.Content>
		</Modal> }
	    </Grid.Column>
	  </Grid.Row>
	  {lockers && lockers.map((l, i) => 
	  <Grid.Row color={ l.color } columns={6}>
		  <Locker digits={ l.digits } type={ l.type } code={ l.code } onlockchanged={this.handleLock(i)}/>
	  </Grid.Row>)
	  }
        </Grid>
      </header>
    </div>
  );
}
}

export default App;
