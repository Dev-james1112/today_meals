
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Ttext} from '../../assets/components/Text';
import Tinput from '../../assets/components/Input';
import { saveSchool } from '../../assets/scripts/AsyncStorage';

function Setsc({navigation}) {
    // Get school list
    const [datas, setData] = useState(<View></View>);
    const setSchoolId = (schoolId, schoolName, regionCode) => {
        saveSchool("@ID", schoolId)
        saveSchool("@NM", schoolName)
        saveSchool("@REGION", regionCode)
        navigation.navigate('SetCom');
    }

    const setSchool = (text) => {
        const key = '6c8bda44c1d949b88a48a7d0bb3a8205'
        const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${key}&TYPE=json&pIndex=1&pSize=10&SCHUL_NM=${text}`

        fetch(url).then(res => res.json()).then( data => {
            if (data.schoolInfo != undefined && text != "") {
                var arr = new Array();
                var count = -1;
                for (let i of data["schoolInfo"][1]["row"]) {
                    count ++;
                    arr[count] = {SD_SCHUL_CODE: i.SD_SCHUL_CODE, SCHUL_NM: i.SCHUL_NM, ORG_RDNMA: i.ORG_RDNMA, COUNT: count,ATPT_OFCDC_SC_CODE: i.ATPT_OFCDC_SC_CODE};

                }
                setData(arr.map((i) => <TouchableOpacity style={styles.school_box} onPress={() => setSchoolId(i.SD_SCHUL_CODE, i.SCHUL_NM, i.ATPT_OFCDC_SC_CODE)} key={i.COUNT+1}><Text key={i} style={styles.school_main_text}>{i.SCHUL_NM}</Text><Text key={i.COUNT} style={styles.school_sub_text}>{i.ORG_RDNMA}</Text></TouchableOpacity>));
            } else {
                try {
                    if (data.RESULT.MESSAGE == "해당하는 데이터가 없습니다.") {
                        setData(<Text style={styles.header_text}>조회된 학교가 없어요</Text>);
                    } else {
                        setData("");
                    }
                } catch(err) {
                    setData("");
                }
            }
        })
    }

    return (
        <View style={styles.main}>
            <Ttext text='사용자님이 다니는'/>
            <Ttext text='학교를 알려주세요'/>
            <Tinput text='학교 이름' call={ setSchool }></Tinput>
            <ScrollView style={styles.con}>{ datas }</ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    main:  {
        backgroundColor: "#FFF",
        height: "100%",
        wight: "100%",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    school_box: {
        padding: 12,
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: "#F2F2F2"
    },
    school_main_text: {
        fontSize: 18,
        fontFamily: "Noto Sans KR",
        fontWeight: "500",
        color: "#000",
        lineHeight: 20
    },
    school_sub_text: {
        fontSize: 12,
        fontFamily: "Noto Sans KR",
        fontWeight: "400",
        color: "#595959",
        lineHeight: 16
    },
    header_text: {
        fontSize: 16,
        fontFamily: "Noto Sans KR",
        fontWeight: "500",
        color: "#595959",
        lineHeight: 150,
        textAlign: "center",
        justifyContent: "center",
    },
    con: {
        paddingTop: 10,
    }
});

export default Setsc;