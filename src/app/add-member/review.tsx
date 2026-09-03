import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAddMember } from "./_layout";

export default function ReviewScreen(){
  const { form } = useAddMember();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <Text onPress={() => router.back()} style={styles.back}>‹ Back</Text>
          <Text style={styles.step}>5 of 6</Text>
        </View>

        <Text style={styles.title}>Review Submission</Text>

        <View style={styles.card}><Text style={styles.label}>Full name</Text><Text>{form.fullName}</Text></View>
        <View style={styles.card}><Text style={styles.label}>ID number</Text><Text>{form.idNumber}</Text></View>
        <View style={styles.card}><Text style={styles.label}>Stand</Text><Text>{form.stand}</Text></View>
        <View style={styles.card}><Text style={styles.label}>Spouse</Text><Text>{form.spouseName} — {form.spouseId}</Text></View>
        <View style={styles.card}><Text style={styles.label}>Next of kin</Text><Text>{form.nextOfKin}</Text></View>
        <View style={styles.card}><Text style={styles.label}>Household size</Text><Text>{form.householdSize}</Text></View>
        <View style={styles.card}><Text style={styles.label}>Address</Text><Text>{form.address}</Text></View>

        <View style={styles.actions}>
          <Pressable onPress={() => router.push('/add-member/documents')}>
            <Text style={styles.cancel}>‹ Back</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/add-member/complete')}>
            <Text style={styles.submit}>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{ flex:1, backgroundColor:'#F4F7F5' },
  container:{ padding:20, paddingBottom:36 },
  topBar: { flexDirection:'row', justifyContent:'space-between', marginBottom:12 },
  back: { color:'#175744', fontSize:14, fontWeight:'600' },
  step: { color:'#7B8C87', fontSize:11, fontWeight:'600' },
  title:{ fontSize:22, fontWeight:'700', color:'#203A35', marginBottom:12 },
  card:{ backgroundColor:'#FFFFFF', padding:12, borderRadius:10, borderWidth:1, borderColor:'#D9E2DE', marginBottom:10 },
  label:{ fontSize:12, fontWeight:'700', color:'#175744', marginBottom:6 },
  actions:{ flexDirection:'row', justifyContent:'flex-end', gap:12, marginTop:8 },
  cancel:{ paddingHorizontal:18, paddingVertical:12, borderRadius:9, borderWidth:1, borderColor:'#D9E2DE', color:'#175744', fontWeight:'600' },
  submit:{ paddingHorizontal:20, paddingVertical:12, borderRadius:9, backgroundColor:'#175744', color:'#FFFFFF', fontWeight:'700' }
});
