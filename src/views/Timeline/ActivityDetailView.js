import {React} from "react";
import {View, Text} from "react-native";

export class ActivityDetailView extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.onePaneContainer}>
                    <View style={styles.onePaneHeader}>
                        <View style={styles.onePaneHeaderLeftIconContainer}>
                            <TouchableHighlight onPress={() => this.onClearSelection()}>
                                <Icon style={styles.onePaneHeaderBackButton} name="ios-arrow-back"/>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.onePaneHeaderTitleContainer}>
                            <Text style={styles.onePaneHeaderTitle}>{activeNote.title}</Text>
                        </View>
                    </View>
                    <View style={styles.onePaneContent}>
                        <NoteDetails item={activeNote} onChangeItem={(item: Note) => this.onChangeItem(item)} />
                    </View>
                </View>
        );
    }

}