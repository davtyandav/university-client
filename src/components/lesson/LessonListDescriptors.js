import React from 'react';
import LessonDescriptor from "./../pages/LessonDescriptor";

const LessonListDescriptors = ({descriptors}) => {
    return (
        <div className="container">
            <div className="scroll-box">
                {descriptors.length === 0
                    ? (<p>Список пуст.</p>)
                    : (descriptors.map((descriptor) => (
                            <LessonDescriptor
                                key={descriptor.id}
                                descriptor={descriptor}
                            />
                        ))
                    )}
            </div>
        </div>
    );
};

export default LessonListDescriptors;