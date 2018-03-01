import React from 'react';
import { Image, List } from 'semantic-ui-react';
// import { render } from "react-dom";
import 'semantic-ui-css/semantic.min.css';
// import animated from 'semantic-ui-css';

const ListExampleAnimated = (props) => (
  <List animated verticalAlign='middle'>
    <List.Item>
      <Image avatar src='/assets/images/avatar/small/helen.jpg' />
      <List.Content>
        <List.Header>Helen</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='/assets/avator.png' />
      <List.Content>
        <List.Header>{props.username}</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='/assets/images/avatar/small/daniel.jpg' />
      <List.Content>
        <List.Header>Daniel</List.Header>
      </List.Content>
    </List.Item>
  </List>
)

export default ListExampleAnimated;
