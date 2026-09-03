import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAddMember } from "./_layout";

export default function SpouseScreen() {
  const { form, setForm } = useAddMember();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.topBar}>
          <Text onPress={() => router.back()} style={styles.back}>‹ Back</Text>
          <Text style={styles.step}>2 of 6</Text>
        </View>

        <Text style={styles.eyebrow}>MEMBER REGISTRY</Text>
        <Text style={styles.title}>Spouse</Text>
        <Text style={styles.subtitle}>Complete where a spouse is registered</Text>

        <View style={styles.progress}>
          <View style={styles.progressPart} />
          <View style={[styles.progressPart, styles.active]} />
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
        </View>

        <View style={styles.cardBody}>
          <View style={styles.field}>
            <Text style={styles.label}>SPOUSE FULL NAME</Text>
            <TextInput style={styles.input} placeholder="Enter spouse name" value={form.spouseName} onChangeText={(v)=> setForm({ spouseName: v })} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>SPOUSE NATIONAL ID</Text>
            <TextInput style={styles.input} placeholder="Enter spouse national ID" value={form.spouseId} onChangeText={(v)=> setForm({ spouseId: v })} />
          </View>
        </View>

        <View style={styles.actions}>
          <Text onPress={() => router.back()} style={styles.cancel}>Cancel</Text>
          <Text onPress={() => router.push('/add-member/household')} style={styles.continue}>Continue →</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex:1, backgroundColor: '#F4F7F5' },
  container: { padding:20, paddingBottom:40 },
  topBar: { flexDirection:'row', justifyContent:'space-between', marginBottom:18 },
  back: { color:'#175744', fontSize:14, fontWeight:'600' },
  step: { color:'#7B8C87', fontSize:11, fontWeight:'600' },
  eyebrow: { color:'#175744', fontSize:10, fontWeight:'700', letterSpacing:1 },
  title: { fontSize:28, fontWeight:'700', color:'#203A35', marginTop:6 },
  subtitle: { color:'#7B8C87', fontSize:12, lineHeight:19, marginTop:4, marginBottom:16 },
  progress:{ flexDirection:'row', gap:4, marginBottom:16 },
  progressPart:{ flex:1, height:4, borderRadius:4, backgroundColor:'#DCE5E1' },
  active:{ backgroundColor:'#175744' },
  cardBody:{ backgroundColor:'#FFFFFF', borderRadius:14, borderWidth:1, borderColor:'#D9E2DE', padding:16, marginBottom:16 },
  field:{ marginBottom:14 },
  label:{ color:'#5C716B', fontSize:10, fontWeight:'700', marginBottom:6 },
  input:{ height:48, borderWidth:1, borderColor:'#BFCBC6', borderRadius:8, backgroundColor:'#FFFFFF', paddingHorizontal:12, color:'#203A35' },
  actions:{ flexDirection:'row', justifyContent:'flex-end', alignItems:'center', gap:12 },
  cancel:{ paddingHorizontal:18, paddingVertical:13, borderRadius:9, borderWidth:1, borderColor:'#D9E2DE', color:'#175744', fontSize:13, fontWeight:'600' },
  continue:{ paddingHorizontal:20, paddingVertical:13, borderRadius:9, backgroundColor:'#175744', color:'#FFFFFF', fontSize:13, fontWeight:'700' }
});
