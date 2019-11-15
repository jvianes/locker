import React from 'react';
import { Dropdown, Icon, Grid, Input } from 'semantic-ui-react';

const colorOptions = [
	{ key: 1, text: 'Red', value: 1, color: 'red' },
	{ key: 2, text: 'Green', value: 2, color: 'green' },
	{ key: 3, text: 'Blue', value: 3, color: 'blue' },
];
const digitOptions = [
	{ key: 1, text: '1', value: 1 },
	{ key: 2, text: '2', value: 2 },
	{ key: 3, text: '3', value: 3 },
	{ key: 4, text: '4', value: 4 },
	{ key: 5, text: '5', value: 5 },
	{ key: 6, text: '6', value: 6 },
	{ key: 7, text: '7', value: 7 },
	{ key: 8, text: '8', value: 8 },
	{ key: 9, text: '9', value: 9 },
	{ key: 0, text: '0', value: 0 },
];

class Locker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			digits: Array(this.props.digits).fill(null),
			locked: true
		};
	}

	handleChange(i) {
		return (e, v) => {
			var { digits } = this.state;
			digits[i] = v.value;
			this.setState({ digits });
			const { code } = this.props;
			
			const locked = !digits.reduce((acc, d, i) => acc && (d === code[i]), true);
			this.setState({ locked });
			this.props.onlockchanged(!locked);
		}
	}

	render() {
		const { type } = this.props;
		const { digits, locked } = this.state;
		const options = (type === 'colors') ? colorOptions : digitOptions;
		return <>
			<Grid.Column width={1} verticalAlign='middle'>
			{locked && <Icon name='lock' color='red'/>}
			{!locked && <Icon name='unlock' color='green'/>}
		</Grid.Column>
			{digits.map((d, i) =>
				<Grid.Column width={2}>
				{ type === 'pass' && <Input onChange={this.handleChange(i)} fluid/> }
				{ type === 'digits' && <Dropdown options={options} onChange={this.handleChange(i)} clearable selection fluid value={d}/> }
				{ type === 'colors' && <Dropdown onChange={this.handleChange(i)} clearable selection fluid value={d} text={d && colorOptions.find((o) => o.key===d).text}><Dropdown.Menu>
						{colorOptions.map((o) => (
							<Dropdown.Item key={o.key} value={o.value} label={{color:o.color,  empty: true, circular: true}} text={o.text} onClick={this.handleChange(i)}/>))
						}
				</Dropdown.Menu></Dropdown>}
				</Grid.Column>
			)}
			</>;
	}
}

export default Locker;

