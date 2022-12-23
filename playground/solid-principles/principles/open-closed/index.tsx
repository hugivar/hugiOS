import Button from './button';
import {
    HiOutlineArrowNarrowRight
} from "react-icons/hi";

export default function () {
    return (
        <>
            <Button>
                <div>Hello World</div>
                <div>Click me</div>
            </Button>
            <Button>
                <HiOutlineArrowNarrowRight />
                <div>Go Back</div>
            </Button>
        </>
    );
};