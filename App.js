import React from 'react';
import {
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
	Dimensions,
	LayoutAnimation
} from 'react-native';
import Padlock from "./src/components/Padlock";
import FoldView from "./src/components/FoldView";

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : 0;

import Row from "./src/components/Row";

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			expanded: false,
			height: 180,
		};
	}

	renderFrontface() {
		return (
			<Padlock/>
		);
	}

	renderBackface() {
		return (
			<Padlock/>
		);
	}

	flip() {
		this.setState({
			expanded: !this.state.expanded,
		});
	}

	handleAnimationStart(duration, height) {
		const isExpanding = this.state.expanded;

		const animationConfig = {
			duration,
			update: {
				type: isExpanding ? LayoutAnimation.Types.easeOut : LayoutAnimation.Types.easeIn,
				property: LayoutAnimation.Properties.height,
			},
		};

		LayoutAnimation.configureNext(animationConfig);

		this.setState({
			height,
		});
	}

	componentDidMount() {
		setTimeout(() => this.flip(), 1000)
	}

  render() {
    return (
			//{/*<FoldView*/}
				// expanded={this.state.expanded}
				// onAnimationStart={(duration, height) => this.handleAnimationStart(duration, height)}
				// perspective={48}
				// renderBackface={() => this.renderBackface()}
				// renderFrontface={() => this.renderFrontface()}
			// >
				<Padlock/>
			// </FoldView>
			//{/*<View style={styles.container}>*/}
				//{/*<View style={styles.child}></View>*/}
			//{/*</View>*/}
			// {/*<View style={styles.container}>*/}
			// 	{/*<StatusBar*/}
			// 		{/*barStyle="light-content"*/}
			// 	{/*/>*/}
			// 	{/*<ScrollView*/}
			// 		{/*style={styles.scrollView}*/}
			// 	{/*>*/}
			// 		{/*<Row zIndex={100} />*/}
			// 		{/*<Row zIndex={90} />*/}
			// 		{/*<Row zIndex={80} />*/}
			// 		{/*<Row zIndex={70} />*/}
			// 	{/*</ScrollView>*/}
			// {/*</View>*/}
    )
  }
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#333',
		flex: 1,
	},
	child: {
		flex: 1,
		backgroundColor: 'blue',
		transform: [
			{ perspective: 850 },
			// { translateX: - Dimensions.get('window').width * 0.24 },
			{ rotateY: '60deg' },
		]
	}
	// container: {
	// 	flex: 1,
	// },
	// scrollView: {
	// 	backgroundColor: '#4A637D',
	// 	flex: 1,
	// 	padding: 10,
	// 	paddingTop: STATUSBAR_HEIGHT,
	// },
});
