import { Box } from './Box';

import React, { Component } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';

export class App extends Component {
  static defaultProps = { initialValue: 0 };

  state = {
    good: this.props.initialValue,
    neutral: this.props.initialValue,
    bad: this.props.initialValue,
  };

  handleTarget = e => {
    const target = e.currentTarget.name;

    this.setState(prevState => {
      return {
        [target]: prevState[target] + 1,
      };
    });
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;

    return good + bad + neutral;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;

    return (good / this.countTotalFeedback()) * 100;
  };

  render() {
    return (
      <Box p={10}>
        <FeedbackOptions
          options={Object.keys(this.state)}
          onLeaveFeedback={this.handleTarget}
        ></FeedbackOptions>

        <Statistics
          good={this.state.good}
          neutral={this.state.neutral}
          bad={this.state.bad}
          total={this.countTotalFeedback()}
          positivePercentage={this.countPositiveFeedbackPercentage().toFixed(0)}
        ></Statistics>
      </Box>
    );
  }
}
