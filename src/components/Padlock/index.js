import React, {Component} from 'react'
import {Animated, Image, View, StyleSheet, ImageBackground, Easing} from "react-native";
import transformUtil from './transformUtil';

export default class Padlock extends Component {
	constructor(props) {
		super(props)
		this.state = {
			animationValue: new Animated.Value(0),
			unlocked: false,
			layout: null,
		}
	}

	animate = toValue => {
		Animated.spring(this.state.animationValue, {
			toValue: toValue,
			duration: 3000,
			easing: Easing.linear
		}).start();
	};

	componentDidMount() {
		this.state.animationValue.addListener(({ value }) => {
			this.flushTransform(this.lockTopRef, value, this.state.layout.width / 2 - 5);
		});
	}

	flushTransform(ref, dx, x) {
		const matrix = transformUtil.rotateY(dx);
		transformUtil.origin(matrix, { x: x, y: 0, z: 0 });

		ref.setNativeProps({
			style: {
				transform: [
					{
						matrix,
					},
				],
			},
		});
	}

	handleLayout(event) {
		const layout = event.nativeEvent.layout
		this.setState({
			layout: layout,
		});
	}

	render() {
		if (this.state.unlocked) {
			this.animate(180)
		}
		const wrapperStyle = {
			alignItems:'center',
			alignSelf:'center',
			justifyContent: 'center',
			width: 48,
			height: 38,
			transform: [
				{
					// translateX: this.state.animationValue.interpolate({
					// 	inputRange: [0, 1],
					// 	outputRange: [0, 100],
					// }),
					rotateY: this.state.animationValue.interpolate({
						inputRange: [0, 1],
						outputRange: ['0deg', '180deg']
					}),
				},
			],
		};

		return (
			<View
				style={styles.container}
			>
				<ImageBackground
					source={require('./img/Oval.png')}
					style={{
						alignItems:'center',
						alignSelf:'center',
						justifyContent: 'center',
						width: 154,
						height: 154,
					}}
				>
					<View>
						<Animated.View
							style={wrapperStyle}
							ref={ref => this.lockTopRef = ref}
							onLayout={(event) => this.handleLayout(event)}
						>
							<Image style={styles.image} source={require('./img/LockTop.png')}/>
						</Animated.View>
						<View style={{
							alignItems:'center',
							alignSelf:'center',
							justifyContent: 'center',
							width: 59,
							height: 42,
							paddingTop: 5,
						}}>
							<Image style={styles.image} source={require('./img/LockBottom.png')}/>
						</View>
					</View>
				</ImageBackground>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		paddingTop: 200,
	},
	image: {
		width: '100%',
		height: '100%',
	}
})
