"use client"
import dynamic from 'next/dynamic';

const CustomEditor = dynamic( () => import( '@/components/feedback' ), { ssr: false } );

function FeedBack() {
  return (
    <CustomEditor />
  );
}

export default FeedBack;