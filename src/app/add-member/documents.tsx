import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAddMember } from "./_layout";

export default function DocumentsScreen() {
  const { form, setForm } = useAddMember();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.topBar}>
          <Text onPress={() => router.back()} style={styles.back}>‹ Back</Text>
          <Text style={styles.step}>4 of 6</Text>
        </View>

        <Text style={styles.eyebrow}>DOCUMENTS</Text>
        <Text style={styles.title}>Supporting Documents</Text>
        <Text style={styles.subtitle}>Enter document references (placeholders)</Text>

        <View style={styles.progress}>
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
          <View style={[styles.progressPart, styles.active]} />
          <View style={styles.progressPart} />
          <View style={styles.progressPart} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>ID DOCUMENT REF</Text>
          <TextInput style={styles.input} value={form.documents?.idRef || ''} onChangeText={(v)=> setForm({ documents: { ...(form.documents||{}), idRef: v } })} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>PROPERTY TITLE REF</Text>
          <TextInput style={styles.input} value={form.documents?.titleRef || ''} onChangeText={(v)=> setForm({ documents: { ...(form.documents||{}), titleRef: v } })} />
        </View>

        <View style={styles.actions}>
          <Pressable onPress={() => router.push('/add-member/household')}>
            <Text style={styles.cancel}>‹ Back</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/add-member/review')}>
            <Text style={styles.continue}>Review →</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex:1, backgroundColor: '#F4F7F5' },
  container: { padding:20, paddingBottom:36 },
  eyebrow: { color:'#175744', fontSize:10, fontWeight:'700', letterSpacing:1, marginBottom:6 },
  title: { fontSize:28, fontWeight:'700', color:'#203A35' },
  subtitle: { color:'#7B8C87', marginTop:6, marginBottom:12 },
  topBar: { flexDirection:'row', justifyContent:'space-between', marginBottom:12 },
  back: { color:'#175744', fontSize:14, fontWeight:'600' },
  step: { color:'#7B8C87', fontSize:11, fontWeight:'600' },
  progress:{ flexDirection:'row', gap:4, marginBottom:12 },
  progressPart:{ flex:1, height:4, borderRadius:4, backgroundColor:'#DCE5E1' },
  active:{ backgroundColor:'#175744' },
  field:{ marginBottom:12 },
  label:{ fontSize:10, fontWeight:'700', color:'#5C716B', marginBottom:6 },
  input:{ height:48, borderWidth:1, borderColor:'#BFCBC6', borderRadius:8, backgroundColor:'#FFFFFF', paddingHorizontal:12, color:'#203A35' },
  actions:{ flexDirection:'row', justifyContent:'flex-end', gap:12, marginTop:8 },
  cancel:{ paddingHorizontal:18, paddingVertical:12, borderRadius:9, borderWidth:1, borderColor:'#D9E2DE', color:'#175744', fontWeight:'600' },
  continue:{ paddingHorizontal:20, paddingVertical:12, borderRadius:9, backgroundColor:'#175744', color:'#FFFFFF', fontWeight:'700' }
});
