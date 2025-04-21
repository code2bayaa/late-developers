"use client"
// Dynamically import CKEditor to prevent SSR errors

import {
    Undo, 
    IndentBlock,
     Indent,
      TodoList,
       CodeBlock,
        BlockQuote,
         Alignment,
          Link,
           Code,
            Heading,
             Image,
              ImageToolbar,
               ImageUpload,
                Font,
                 List,
                  Superscript,
                   Subscript,
                    Strikethrough,
                     DecoupledEditor,
                      Bold,
                       Essentials,
                        Italic,
                         Paragraph,
                          Autoformat
} from 'ckeditor5';


// const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor), { ssr: false });
// const DecoupledEditor = dynamic(() => import("@ckeditor/ckeditor5-build-decoupled-document"), { ssr: false });

import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import {useEffect, useState, useRef} from "react"
import swal from "sweetalert"
import gsap from "gsap"
import {feedback} from "@/assets"
import { runThemes } from './themes';

export default function FEEDBACKCOMPONENT(){
    const [ isMounted, setMounted ] = useState( false );
    const [form, setForm] = useState({name:"",email:"",message:""})
    const [loading, setLoading] = useState(false)
    const editorToolbarRef = useRef( null );
    const formRef = useRef(null)

    useEffect( () => {
        runThemes(window.screen.width)
        gsap.to("#NavBar",{
            onStart:() => {
                document.getElementById("NavBar").classList.add("feedback")
                document.getElementById("logo").style.background = "transparent"
            },
            minHeight:"30%",
            duration:3
        })

        
        setMounted( true );


        return () => {
            setMounted( false );
        };
    }, [] );

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        if(!form.name || !form.email || !form.message){
            swal("oops","fill all fields","error")
            setLoading(false)
            return false
        }
        const response = await fetch("/api/Feedback",{
            method: "POST",
            body:JSON.stringify({
              form
            }),
            headers: {
              'Content-Type': 'application/json', // Indicates the body is JSON
            },
        });

        const {status, results} = await response.json()
        console.log(results, "results")
        if(status){
            swal("success","success")            
        }else{
            swal("oops","try again","error")
        }
        setLoading(false)
    }

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="w-[100%] min-h-[100%] text-center">
            <h2 style={{fontSize:"200%"}}>FEEDBACK</h2>            
            <p>We would like to hear from you; write to us below</p>
            <form
                ref={formRef}
                onSubmit={(e) => handleSubmit(e)}
                className='w-[80%] bg-[#F5F5F5] mx-[10%]'
            >
                <div className='w-[100%] h-[30%]'>
                    <h2>NAME</h2>
                    <input
                        type='text'
                        name='name'
                        className='w-[100%] h-[50px] bg-[#F5F5F5]'
                        style={{borderBottom:"1px solid #000"}}
                        placeholder='NAME'
                        required
                        value={form.name}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className='w-[100%] h-[30%]'>
                    <h2>EMAIL</h2>
                    <input
                        type='text'
                        name='email'
                        className='w-[100%] h-[50px] bg-[#F5F5F5]'
                        style={{borderBottom:"1px solid #000"}}
                        placeholder='EMAIL'
                        required
                        value={form.email}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div ref={ editorToolbarRef } className='w-[100%] h-[70%]'></div>
                <div className='w-[100%] h-[70%]'>
                    { isMounted && (
                        <CKEditor
                            editor={ DecoupledEditor }
                            // style={{borderBottom:"1px solid #000"}}
                            // data='<p>Hello from CKEditor 5 decoupled editor!</p>'
                            config={ {
                                toolbar: ["bold", "italic", "link"],
                                placeholder:"Write Your feedback here...",
                                plugins: [ 
                                    Essentials, Autoformat, Bold, Italic, Strikethrough, Subscript, Superscript, Code, Paragraph, Heading, Font, List, Alignment, Link, Image, ImageToolbar, ImageUpload, BlockQuote, CodeBlock, TodoList, Indent, IndentBlock, Undo 
                                ],
                                toolbar: [ 
                                    'undo', 'redo', '|', 'bold', 'italic', 'numberedList', 'bulletedList', '|', 'heading', '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code', '-', '|', 'alignment', 'link', 'uploadImage', 'blockQuote', 'codeBlock', '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent' 
                                ]
                            } }
                            onReady={ ( editor ) => {
                                if ( editorToolbarRef.current ) {
                                    editorToolbarRef.current.appendChild( editor.ui.view.toolbar.element );
                                }
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
                                setForm({ ...form, "message": data });
                            }}
                            onAfterDestroy={ ( editor ) => {
                                if ( editorToolbarRef.current ) {
                                    Array.from( editorToolbarRef.current.children ).forEach( child => child.remove() );
                                }
                            }}
                        />
                    ) }
                </div>
                <button
                    type='submit'
                    disabled={loading}
                    className='w-[40%] h-[40px] bg-[#000] text-white'
                >
                    {loading ? "Sending..." : "Submit"}
                </button>
            </form>
        </div>
    )
}