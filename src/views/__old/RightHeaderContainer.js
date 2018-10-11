import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

export default class RightHeaderContainer extends Component<Props> {
    render() {
      return (
        <View style={styles.rightHeaderContainer}>
            <View style={{alignItems: "flex-start"}}>
              <Icon name="search" color='#fff' style={{paddingTop: -100}} size={23} />
            </View>
            {/* <View style={{alignItems: "flex-start",paddingTop:15}}>
              <MenuContext>
                <Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
                    <MenuTrigger>
                      <Icon name="more-vert" color='#fff' size={23} />
                    </MenuTrigger>  
                    <MenuOptions>
                      <MenuOption value={1}>
                        <Text>Profile</Text>
                      </MenuOption>
                      <MenuOption value={2}>
                        <Text>Settings</Text>
                      </MenuOption>
                    </MenuOptions>
                </Menu>
              </MenuContext>
            </View> */}
        </View>
      );
    }
}

const styles = StyleSheet.create({
    rightHeaderContainer: {
        alignItems: "flex-end",
        flexDirection: "row"
    }
  });