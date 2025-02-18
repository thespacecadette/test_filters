import React, { useEffect, useRef } from 'react';
import { TOP_NAV_HEIGHT, SPACING_BLOCK, SPACING_COMPONENT } from "../../styles/theme";

interface props {
  children?: React.ReactNode;
  isLoading: boolean;
  onScrollToBottom: () => void;
};

export const InfiniteScroller: React.FC<props> = ({ children, isLoading, onScrollToBottom }) => {
    const handleScroll = () => {
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
            onScrollToBottom();
        }
      };
      
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [!!isLoading]);
    
    return <div
        style={{
        height: '100vh',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#f1f1f1',
    }}>
        {children}
    </div>
}