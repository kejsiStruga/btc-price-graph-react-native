// @flow
import React, { Component } from 'react';
import {
    Dimensions, 
    LayoutAnimation, 
    StyleSheet, 
    View
} from 'react-native';
import {
    Group, 
    Path, 
    Surface, 
    Shape
} from 'react-native/Libraries/ART/ReactNativeART';

export default class Line extends Component {
    props: {
        values: Array<number>,
        fillColor: string, 
        strokeColor: string,
        strokeWidth: number
    };

    static defaultProps = {
        fillColor: 'rgba(103, 58, 183, 1)', // solid violet color
        strokeColor: 'rgba(103, 58, 183, 0.25)', // semi-transparent violet
        strokeWidth: 8 
    };

    state = {
        // set initial width to screen width so when animated it stays constant
        // try setting it to zero and see what happends on initial load
        width: Dimensions.get('window').width,
        // set initial height to zero so when updated to actual height and
        // animated, the chart raises from the bottom to the top of the container
        height: 0,
    };

    componentWillUpdate() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        // Handle container view's onLayout event to get its width and height after render
        // update the state so the component can render the chart using actual width and height
        onLayout = (event: Object) => {
            // pull out width and height out of event.nativeEvent.layout
            const {
                nativeEvent: {
                    layout: {
                        width, 
                        height
                    }
                }
            } = event;

            // update the state
            this.setState({
                width, 
                height
            })
        };
    };

    buildPath = (values: Array<number>): Path => {
        const {
            strokeWidth,
        } = this.props;
        const {
            width, 
            height, 
        } = this.state;

        let firstPoint: boolean = true,
        previous: { x: number, y: number };

        const 
            minVal = Math.min(...values);
            maxVal = Math.max(...values) - minVal,
            // step between each value point on horizontal (x) axis
            stepX = width / (values.length - 1 || 1),
            // step between each value point on vertical (y) axis
            stepY = maxVal 
                ? (height - strokeWidth * 2) / maxVal
                : 0,
            // adjust values so that min value becomes 0 and goes to the bottom edge
            adjustedValues = values.map(value => value - minVal);

            let path = Path()
            // start from the left bottom corner so we could fill the area with color
                .moveTo(-strokeWidth, strokeWidth);
            
                adjustedValues.forEach((number, index) => {
                    let x = index * stepX,
                        y = -number * stepY - strokeWidth;
                    
                    if(firstPoint) {
                        // straight line to the first point
                        path.lineTo(-strokeWidth, y);
                    } else {
                        // make curved line
                        path.curveTo(previous.x + stepX / 3, 
                             previous.y, x - stepX / 3, y, x, y);
                    }
                    previous = { x, y };

                    firstPoint = false;
                });
                return path.lineTo(width + strokeWidth, strokeWidth).close();
    };
    render() {
        const {
            values, 
            fillColor, 
            strokeColor, 
            strokeWidth
        } = this.props;
        const {
            width, 
            height
        } = this.state;
        return (
            <View style={styles.container}
                  onLayout={this.onLayout}>
                <Surface width={width} height={height}>
                <Group x={0} y={height}>
                    <Shape
                    d={this.buildPath(values)}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    />
                </Group>
                </Surface>
            </View>
        )
    }
}

/**
 * 
 * Accrete -> collect together slowly over time into a larger amount
 *          -> grow by accumulation or coalescence
 *          -> coalescing over time
 *      
 * "Ice that had accreted grotesquely into stalectites"
 *  
 * Coalesce -> come together and form one mass or whole -- compound 
 *      "the puddles had coalesced into shallow streams"
 * 
 * Profuse -> produced or growing in very large numbers; plentiful or abundant ; "I offered my profuse apologies"
 *      - syn: prolific, abundant, ample, plentiful, copious
 * 
 * Prolific -> (of a plant, animal, or person) producing much fruit or foliage or many offspring
 * 
 * Copious -> abundant in supply or quantity 
 *      "she took copious notes"
 * 
 * Ruthless -> no mercy; not caring about hurting people; 
 *      "The ruthless leader ordered bombings of the southern border of his own country, 
 *          where thousands of his people lived, in order to win the battle"
 * 
 * Foil -> leter varaku; 
 *      -> metal, hammered or rolled, into a thin flexible sheet, used chiefly for covering or 
 *      wrapping food; 
 * Tinfoil -> 
 * 
 */

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // align at the bottom of the container so when animated it rises to the top
      justifyContent: 'flex-end',
    },
  });