import React from 'react';
import './App.css';
import Locker from './components/Locker';
//import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-css-offline';
import { Grid, Icon, Modal, Header, Image, Button } from 'semantic-ui-react';
import recette_hamburger from './images/recette_hamburger.jpg';

const lockers = [ {
	color: 'blue',
        type: 'digits',
        digits: 4,
        code: [7, 1, 9, 2]
}, {
        color: 'red',
        type: 'digits',
	digits: 4,
        code: [3, 8, 7, 6]
}, {
        color: 'black',
        type: 'pass',
        digits: 3,
        code: ['super', 'vous', 'chauffez']
}, {
        color: 'violet',
        type: 'digits',
        digits: 3,
        code: [1, 5, 5]
} ]

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			letterOpened: true,
			lockers: null,
			locks: null,//Array(lockers.length).fill(null),
			locked: true
		};
		this.lockersPromise = fetch('config.json')
		.then((r) => {
			return r.json();
		})
		.then((j) => {
			this.setState({ lockers: j.codes, locks: Array(j.codes.length).fill(null) });
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

	handleLetterOpen = () => this.setState({ letterOpened: true });

	handleLetterClose = () => this.setState({ letterOpened: false });

	render() {
		const { letterOpened, locked, lockers } = this.state;
  return (
    <div className="App">
      <header className="App-header">
	  <Modal basic open={letterOpened}>
	  <Header content='Lettre de W.R.'/>
	  <Modal.Content>
	  <p>Mon art attise les convoitises.<br/>
	  Je sens qu'on me suit, qu'on m'observe.<br/>
	  Je crains d'être enlevé et emmené au terrible Fort Boyard.</p>
	  <p>Sa façade touristique cache une prison maléfique, où tous nos dons sont éternellement volés.</p>
	  <p>Toutes mes connaissances ne sont pas perdues. J'ai pu les regrouper dans une extraordinaire recette unique, cachée sur un serveur informatique.</p>
	  <p>De multiples codes sont nécessaires pour y accéder.<br/>
	  Cherchez ici, trouvez les et redévoilez au monde le vrai goût du bON.</p>
	  <p>N'essayez pas de me retrouver, l'amnésie provoquée par le Fort est irréversible et je suis condamné à faire des plats immangeables pour le restant de mes Jours.</p>
	  <p>Pouvez-vous juste m'envoyer ma valise déjà prête ?</p>
	  <footer>Willy Roveli</footer>
	  </Modal.Content>
	  <Modal.Actions>
	  	<Button color='green' onClick={this.handleLetterClose} inverted>
	  		<Icon name='checkmark'/> J'y vais !
	  	</Button>
	  </Modal.Actions>
	  </Modal>
        <Grid>
	  <Grid.Row columns={1}>
	  	<Grid.Column>
	  		<Button color='green' onClick={this.handleLetterOpen}>
	  			<Icon name='checkmark'/> Revoir la lettre
	  		</Button>
	  	</Grid.Column>
	  </Grid.Row>
	  <Grid.Row columns={1}>
	    <Grid.Column>
          { locked && <Icon name='lock' color='red' size='large'/> }
          { !locked && <Modal trigger={<Icon name='unlock' color='green' size='large' link/>}>
			  <Modal.Header>Félicitation !</Modal.Header>
			  <Modal.Content image>
			  	<Image wrapped size='huge' src={recette_hamburger}/>
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
