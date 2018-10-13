import React from 'react';
import {FlatList, StyleSheet, View, Platform, ActivityIndicator} from 'react-native';
import {List, Icon, Text} from 'react-native-elements';
import { fetchCTAs } from '../../services/CTA';
import {updateCTAState, handleLoadMore, loadCtas} from "../../actions/cta";
import {connect} from 'react-redux';
import CTAView from './../../views/CTA/CTAView';
const isAndroid = Platform.OS == "android";
import {COLOR} from 'react-native-material-ui';

class CTAList extends React.Component {

    componentDidMount() {
        this.loadCtas();
    }

    loadCtas = () => {
        const {ctas} = this.props;

        console.log("CTAs loading");
        this.props.updateState({isLoading:true});
        fetchCTAs().then(res => {
            let data = res.data;
            this.props.updateState({ctas: data.ctas||[], selectedCta: null, isRefreshing: false,isLoading:false});
        });
    }

    render() {
        const { ctas, isRefreshing, selectedCta, isLoading} = this.props;
        let progress = isLoading?<ActivityIndicator size="large" color="#0000ff" />:null;
        if(ctas.length == 0 && (isRefreshing||isLoading)){
            return <ActivityIndicator size="large" color="#0000ff" />;
        } else  if(ctas.length == 0){
            return (
                <View style={{paddingTop: 40, flexDirection: 'column', alignItems: 'center'}}>
                    <Icon
                        reverse
                        name={isAndroid ? 'md-folder-open' : 'ios-folder-open'}
                        type='ionicon'
                        color={COLOR.grey400}
                    />
                    <Text>
                        {"No CTA's found.."}
                    </Text>
                </View>
            );
        }else{
            return (
                <View style={{flex: 1}}>
                        <FlatList
                            data={ctas}
                            renderItem={({item})=>{return (<CTAView item={item}></CTAView>)}}
                            keyExtractor={(item, index) => index+""}
                            refreshing={isRefreshing}
                            onRefresh={()=>{this.props.resetState(); this.loadCtas();}}
                            onEndThreshold={0.1}
                        />
                        {progress}
                </View>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        ctas: state.app.cta.ctas,
        selectedCta: state.app.cta.selectedCta,
        isLoading: state.app.cta.isLoading,
        isRefreshing: state.app.cta.isRefreshing,
        searchText: state.app.searchText
    }
  }
  
  const mapDispatchersToProps = dispatch => {
    return {
        resetState: () => {
            dispatch(updateCTAState({ctas: [], selectedCta: null, isRefreshing: true, isLoading:false}));
        },
        updateState: (payload) =>{
            dispatch(updateCTAState(payload));
        }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchersToProps)(CTAList);