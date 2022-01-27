
const toggle = document.querySelector(".toggle__theme");
const card = document.querySelector(".app");
toggle.addEventListener("click", () => {
    let theme = toggle.querySelector(".fas");
    if (theme.classList.contains("fa-moon")) {
        theme.classList.remove("fa-moon");
        theme.classList.add("fa-sun");
        card.classList.add("dark");
    } else {

        theme.classList.remove("fa-sun");
        theme.classList.add("fa-moon");
        card.classList.remove("dark");

    }
})

//Chống copy
function killCopy(e){
    return false;
}

function reEnable(){
    return true;
}

document.onselectstart=new Function ("return false");

if (window.sidebar){
    document.onmousedown=killCopy;
    document.onclick=reEnable;
}

function noteOut()
{
    var note = document.querySelector(".note");
    note.style.display = "none";
}

setInterval(noteOut,3000);

//Chống chuột phải 
window.onload = function() {
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    }, false);
    document.addEventListener("keydown", function(e) {
        //document.onkeydown = function(e) {
        // "I" key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            disabledEvent(e);
        }
        // "J" key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
            disabledEvent(e);
        }
        // "S" key + macOS
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            disabledEvent(e);
        }
        // "U" key
        if (e.ctrlKey && e.keyCode == 85) {
            disabledEvent(e);
        }
        // "F12" key
        if (event.keyCode == 123) {
            disabledEvent(e);
        }
    }, false);

    function disabledEvent(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
        e.preventDefault();
        return false;
    }
};

//Chống Ctrl + U
document.onkeydown = function(e) {
    if (e.ctrlKey && 
        (e.keyCode === 67 || 
         e.keyCode === 86 || 
         e.keyCode === 85 || 
         e.keyCode === 117)) {
        return false;
    } else {
        return true;
    }
};
$(document).keypress("u",function(e) {
    if(e.ctrlKey) return false;
    else return true;
});
//
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (!isChrome) {
            $('#iframeAudio').remove()
        }
        else {
            $('#playAudio').remove()
        }



namespace App\Http\Controllers;
use App\Requests\StudentRequest;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\ChuyenMuc;
use App\Models\TinTuc;
use DB;
class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function db(){
        $var = DB::table('sinhvien')->orderBy('hoten','desc')->get()->first();//->latest()

        return $var;
    }
    public function db1(){
        $var = DB::table('sinhvien')->where('hoten','Cao Văn Sơn')->get();
        return dump($var);
    }
    public function db12(){
        $var = DB::table('sinhvien')->where('hoten','Cao Văn Sơn')->value('masv');
        return $var;
    }
    public function db2(){
        $var = DB::table('sinhvien')->where('cao','<=',23)->get();
        return $var;
    }
    public function db3(){
        $var = DB::table('sinhvien')->select('masv','hoten')
        ->distinct('hoten')
        ->where('cao','<=',23)
        ->orderBy('hoten','desc')
        ->get();
        return $var;
    }
    public function db4(){
        $var = DB::table('sinhvien')->select('masv','hoten')
        ->orderBy('hoten','desc')->where('hoten','Cao Văn Sơn')
        // ->sum('cao');
        // ->avg('price');
        // ->min('price');
        // ->max('price');
        ->count();
        return $var;
    }
    public function db5(){
        $var = DB::table('sinhvien')
        ->insertGetId([
            'name'  =>  'Seth Phat',
            'email' =>  'phat@sethphat.com',
            'phone' =>  '0901234567',
            'age'   =>  21
        ]);
        return $var;
    }
    public function db6(){
        $var = DB::table('ok')->truncate();// xao tât cả reset id ve 0
        echo $var;
    }
    public function db7(){
        $var = DB::table('sinhvien')->pluck('hoten');
        echo $var;
    }
    public function db8(){
        $var = DB::table('sinhvien')->pluck('cao', 'hoten');
        echo $var;
    }
    public function db9(){
        $var = DB::table('sinhvien')->get()->limit(5);//
        echo $var;
    }
    // $users = DB::table('users')
    //  ->select(DB::raw('count(*) as user_count, status'))
    //  ->where('status', '<>', 1)
    //  ->groupBy('status')
    //  ->get();
    //  $randomUser = DB::table('users')
     //           ->inRandomOrder()
     //           ->first();
     //           ->skip(10)->take(5)->get(); ->offset(10)->limit(5)
     //->attach() thêm
     //->dettach() xóa
     //
    public function db10(){
        $var = DB::table('sinhvien')
        ->join('sv_mh','sv_mh.masv','=','sinhvien.masv')
        ->join('mh','mh.mamh','=','sv_mh.mamh')
        ->get();
        echo $var;
    }
    public function db11(){
        $var = DB::table('sinhvien')
        ->crossJoin('sv_mh')
        ->get()->toJson();
        $myfile = fopen("mau.txt", "w");
        fwrite($myfile,"hello");
        fclose($myfile);
        //echo "<pre>";
        return $var;
    }
    public function db13(){
        $var = ChuyenMuc::find(1)->tintuc;
        echo "<pre>";
        return dd($var);
    }
    public function insert(){
        $var = DB::table('students')->insert(['cne'=>'student','FirstName'=>'Son']);
        echo "Da insert";
    }
    public function update1(){
        DB::table('students')->where(['id'=>7])->update(['cne'=>'student','FirstName'=>'Son']);
        echo "da update";
    }
    public function test(){
        $dat = "cao van son";
        $abc = ['abc','xyz','ght'];
        return view('test',compact('dat','abc'));
    }
    public function test1(Request $req){
        $a = $req->id;
        return $a;
    }
    public function index()
    {
        $student = Student::all();
        //$student = Student::paginate(8);
        //{{$student->links()}}
        return view('student',[
            'student'=>$student,
            'layout'=>'index'
        ]);
    }

    public function api()
    {
        $student = Student::all();
        $response = response()->json($student);
        $response->header('Content-Type', 'application/json');
        $response->header('charset', 'utf-8');
        return response()->json(['data'=>$student], 200, ['Content-type'=> 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $student = Student::all();
        return view('student',[
            'student'=>$student,
            'layout'=>'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        $student = new Student();
        $student->cne=$req->input('cne');
        $student->FirstName=$req->input('FirstName');
        $student->SecondName=$req->input('SecondName');
        $student->age=$req->input('age');
        $student->speciality=$req->input('speciality');
        $student->save();
        return redirect('/');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $studentGetOne = Student::all();
        $student = Student::all();
        return view('student',[
            'student'=>$student,
            'FindByID'=>$studentGetOne,
            'layout'=>'show'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $studentGetOne = Student::find($id);
        $student = Student::all();
        return view('student',[
            'student'=>$student,
            'FindByID'=>$studentGetOne,
            'layout'=>'edit'
        ]);
    }


    public function update(StudentRequest $req,$id)
    {
        $student= Student::find($id);
        $student->cne=$req->input('cne');
        $student->FirstName=$req->input('FirstName');
        $student->SecondName=$req->input('SecondName');
        $student->age=$req->input('age');
        $student->speciality=$req->input('speciality');
        $student->save();
        return redirect('/');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $studentGetOne = Student::find($id);
        $student->delete();
        // return redirect()->back()->with('thongbao','dẫothanhcong');
        return response()->json(['data'=>$student->toAray()],200);
    }
}
