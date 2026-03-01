import { useState } from 'react';

interface BusinessSolutionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BusinessSolutionsModal = ({ isOpen, onClose }: BusinessSolutionsModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-sm flex overflow-hidden"
      onClick={onClose}
    >
      {/* Фон с изображением */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTEhIVFhUVFxUVGBUYFhUYGBYXFxcXFhUVFxgYHSghGBolHRcVITEhJSkrLi4uFx8zODMuNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS8tLS0tLi0tLS0tKy0vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tNf/AABEIAMIBAwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EAEYQAAIBAgQDBgMGAwQIBgMAAAECEQADBBIhMQVBUQYTImFxkTKBoUJSscHR8BQjYhUzcuEHJGOCkrPC8RZDorLS4hdkc//EABoBAAIDAQEAAAAAAAAAAAAAAAMEAAECBQb/xAAyEQACAgEEAAQDBwQDAQAAAAAAAQIDEQQSITEFE0FRImFxFDKBkaGx0RUzQuFSwfA0/9oADAMBAAIRAxEAPwC4xoZqMvSzV3UjzjCYVGyCnzU2atoFJglKEipM1CTVmMkZFARUpqMitIwwCKQpzSFaKGinFEKJUqzJHrRCaLIaYNUKCFGrChD0WhqEwSq1GhqJV86DE3ymVQVDucqkkBVnQuxOyid6xOaiss3XVKySijQR6nW5XNtYxeGAzTcWAxnVgGCtrzEZ18tRyq7hOMW2+LwHz29/1igVaquxcMZv8Ptr7WUa5FCaAPRA02pHMnUNlpjTmmmt5AOGBA06mmpE1GRIMGjmoJpw1ZaCRZITQRSmomvqN2URvJAj1ms8BMNktC1U8VxezbXMbqnyUhifQCsHiHa6GItICBsxJ8XoAPzoU7oR7YxVprLOkdTSrhj2yvj7Fv2b/wCVPQ/tUBh+n2ex0uanzUDGoL97IpY8v2K0E7JkxCkkA6qYI+vzqjb4me8KMAoE9T0O/pOlZN7FAkm5mRwcwMfagDTyiKpXMX/MzzIEb6GBy36c6VnqMYwMQ02c5OxS8GEqZEkT6U5Nc/wMzHEbTEkkyxJJJ05k16BxjB22w94FVjIxAiBprrXk3Z21nuKp5yPmQRWdRq5aSs3V2ZvQaUdXqFpk8YR2uEYfD2cOj3LaMzjMTlB32GvSuW49j8PcuFbVpFjQiBv7Vp9r7rW7a20JCkZdOQA0HtXnmIxCqfCpJ57Afqah0+q1Wtjvqk0vBbq9LpdJLZpo38nQYfh2DuqM9pFbqB/ate52YsEeEsD5H9a49cY3QD2H751bXGt5VvX0Gqj1K5Xk5tOv0b4lF48o1cTwG9b1Rg49x+hrDxVp10ZSD5102C404IDgMPUf2K6KxjLN1fEqsD3A/SuXr+o67Tvi1Z+Td03T6bUq8W4njq61qV6RjOz9h9UzJ7GfyNZeI7Jt9i4D5MIPvIP0q3T9X01/5Fj8lLpOsi81PNfg5Kirk4LFI2qE+hB/Sp0w11vhRj7A114ajVrjDLzT083y8fihWqV6Ri8PvN9hvoa1sL2fuNq5Cj11PyH61aup1lK23kzbpL03y0Y+D4Vcu/YPsN/rXV4HhVq0JAlv6jr9Ku4TDJbGVEA9h+pq1XK1fU9Rqf24iX6XR6dZ5kV8Vj7Vv43Ue8Vg4ntKvJG9yQK5njF5nuMCx0Onsaz0tq5tS1E2uEejp6Np6197yzoL3aJj9lAPMkn9KzLnaG8eZHoAAP0rJooX1V8uWbV0/Tx4RqPxFedixPqZP61WqNRSqZTlLnJopRSikIKKUUUAFKKSigD/2Q==')`,
          opacity: 0.3
        }}
      ></div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl p-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">Апарт-отели и Гостевые дома</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Современные решения для автоматизации управления недвижимостью
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSolutionsModal;