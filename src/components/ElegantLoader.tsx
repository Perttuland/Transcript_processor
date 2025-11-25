import { motion } from 'framer-motion';

interface ElegantLoaderProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function ElegantLoader({ message, size = 'md', className = '' }: ElegantLoaderProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    const dotSize = {
        sm: 'w-1 h-1',
        md: 'w-1.5 h-1.5',
        lg: 'w-2 h-2',
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className={`flex items-center justify-center gap-1 ${sizeClasses[size]}`}>
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className={`${dotSize[size]} rounded-full bg-solita-ochre`}
                        animate={{
                            y: [0, -8, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: index * 0.15,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
            {message && (
                <motion.span
                    className="text-sm text-solita-dark-grey"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {message}
                </motion.span>
            )}
        </div>
    );
}
