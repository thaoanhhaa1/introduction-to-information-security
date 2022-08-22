export default function classNames(...classList) {
    return classList.filter((classItem) => !!classItem).join(' ');
}
